import {
  newTaskPopup,
  openNewTaskPopupButton,
  closeNewTaskPopupButton,
  newTaskFormElement,
  topicInput,
  descriptionInput,
  dateInput,
  monthInput,
  yearInput,
  timeInput,
  colorInput,
  colorPseudoInput, //! пока не нужно
  eventPreviewPopup,
  popupTitleElem,
  popupDateElem,
  popupTimeElem,
  popupDescription,
  closeEventPreviewPopupButton,
  deleteEventPreviewButton,
  completeEventPreviewPopupButton,
  months,
} from './utils/constants.js';

// important class settings
import {cardSettings} from './utils/constants.js';
import {calendarSettings} from './utils/constants.js';

// Classes
import Memory from './components/Memory.js';
import Card from './components/Card.js';
import Task from './components/Task.js';
import Calendar from './components/Calendar.js';

// class instances
export const memory = new Memory();

export const calendar = new Calendar({
  calendarSettings,
  months,
  cardRenderer: (taskItem) => {
    const newCardObj = new Card(taskItem, cardSettings);
    return newCardObj.generateCard();
  },
  memoryConnector: () => {
    return memory.getCurrentTasksArray();
  }
});

// Functions
  // open popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
  // close popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


// Event listeners (public)
openNewTaskPopupButton.addEventListener('click', () => {
  openPopup(newTaskPopup);
});

closeNewTaskPopupButton.addEventListener('click', () => {
  newTaskFormElement.reset();
  closePopup(newTaskPopup);
});

closeEventPreviewPopupButton.addEventListener('click', () => {
  closePopup(eventPreviewPopup);
});


//! по хорошему этим должен заниматься класс ПОПАП + его колбэк
// функция-обработчик сохранения нового таска (с отрисовкой)
newTaskFormElement.addEventListener('submit', (event) => {
  event.preventDefault();

  // собрали поля формы, получили объект
  const rawTaskData = {
    'title' : topicInput.value,
    'description' : descriptionInput.value,
    'year' : yearInput.value,
    'month' : monthInput.value,
    'date' : dateInput.value,
    'time' : timeInput.value,
  }

  // создали из сырого объекта полноценный таск с хэшем и датой (класс Task)
  const newTask = new Task(rawTaskData).getFullTaskData();

  // сохраняем новый таск в мемори (массив + LocalStorage) (класс Memory)
  memory.saveTask(newTask);

  // сбор данных
  const year = yearInput.value;
  const month = monthInput.value - 1;
  const day = dateInput.value;

  // обновляем календарь
  calendar.refreshCalendarAfterNewTaskSubmit(year, month, day);

  // очищаем форму создания таска
  newTaskFormElement.reset();

  // закрываем модальное окно
  closePopup(newTaskPopup);
});
