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
import PopupPreview from './components/PopupPreview.js';

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

// Popups
const addNewTaskPopup = new PopupWithForm({
  popupSelector: '.popup_new-task',
  submitFormHandler: addNewPlaceHandler,
});
addNewTaskPopup.setEventListeners();

const cardPreviewPopup = new PopupPreview({
  popupSelector: '.popup-event-preview',
});
console.log(cardPreviewPopup);
cardPreviewPopup.setEventListeners();

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

  // создали из сырого объекта полноценный таск с хэшем и датой (класс Task)
  const newTask = new Task(rawTaskData).getFullTaskData();

  // сохраняем новый таск в мемори (массив + LocalStorage) (класс Memory)
  memory.saveTask(newTask);

  // сбор данных
  const year = rawTaskData.year;
  const month = rawTaskData.month - 1;
  const day = rawTaskData.date;

  // обновляем календарь
  calendar.refreshCalendarAfterNewTaskSubmit(year, month, day);
}

// Event listeners (public)
openNewTaskPopupButton.addEventListener('click', () => {
  addNewTaskPopup.open();
});
