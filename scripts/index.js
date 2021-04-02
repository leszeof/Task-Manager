import {
  newTaskPopup,
  openNewTaskPopupButton,
  closeNewTaskPopupButton,
  newTaskFormElement,
  topicInput, //! выкинуть все, что не используется
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
import PopupWithForm from './components/PopupWithForm.js';

// class instances
export const memory = new Memory();

export const calendar = new Calendar({
  calendarSettings,
  months,

  cardRenderer: (taskData) => {

    const newCardObj = new Card({
      taskData,
      cardSettings,
      memoryConnector: (hash) => {
        memory.deleteTaskFromLocalStorage(hash);
      },
      cellChecker: (day, cell) => {
        calendar._updateDateCellStatus(day, cell);
      },
    });

    return newCardObj.generateCard();
  },

  memoryConnector: () => {
    return memory.getCurrentTasksArray();
  }
});

const addNewTaskPopup = new PopupWithForm({
  popupSelector: '.popup_new-task',
  submitFormHandler: addNewPlaceHandler,
});

console.log(addNewTaskPopup);
addNewTaskPopup.setEventListeners();


// Functions
function addNewPlaceHandler(formData) {
  // собрали поля формы, получили объект
  const rawTaskData = {
    'title' : formData.topic,
    'description' : formData.description,
    'year' : formData.year,
    'month' : formData.month,
    'date' : formData.date,
    'time' : formData.time,
  };

  console.log(rawTaskData);

  // создали из сырого объекта полноценный таск с хэшем и датой (класс Task)
  const newTask = new Task(rawTaskData).getFullTaskData();

  // сохраняем новый таск в мемори (массив + LocalStorage) (класс Memory)
  memory.saveTask(newTask);

  // сбор данных
  const year = rawTaskData.year;
  const month = rawTaskData.month - 1;
  const day = rawTaskData.date;

}

// Event listeners (public)
openNewTaskPopupButton.addEventListener('click', () => {
  addNewTaskPopup.open();
});

//! по хорошему этим должен заниматься класс ПОПАП + его колбэк
// функция-обработчик сохранения нового таска (с отрисовкой)
// newTaskFormElement.addEventListener('submit', (event) => {
//   event.preventDefault();

//   // собрали поля формы, получили объект
//   const rawTaskData = {
//     'title' : topicInput.value,
//     'description' : descriptionInput.value,
//     'year' : yearInput.value,
//     'month' : monthInput.value,
//     'date' : dateInput.value,
//     'time' : timeInput.value,
//   }

//   // создали из сырого объекта полноценный таск с хэшем и датой (класс Task)
//   const newTask = new Task(rawTaskData).getFullTaskData();

//   // сохраняем новый таск в мемори (массив + LocalStorage) (класс Memory)
//   memory.saveTask(newTask);

//   // сбор данных
//   const year = yearInput.value;
//   const month = monthInput.value - 1;
//   const day = dateInput.value;

//   // обновляем календарь
//   calendar.refreshCalendarAfterNewTaskSubmit(year, month, day);

//   // очищаем форму создания таска
//   newTaskFormElement.reset();

//   // закрываем модальное окно
//   closePopup(newTaskPopup);
// });
