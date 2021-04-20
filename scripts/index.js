import {
  openNewTaskPopupButton,
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
import PopupConfirm from './components/PopupConfirm.js';

// class instances
export const memory = new Memory();

export const calendar = new Calendar({
  calendarSettings,
  months,
  cardRenderer: (taskData) => {
    const card = new Card({
      taskData,
      cardSettings,
      deleteCardHandler: (taskData) => {
        confirmPopup.open(card, taskData);
      },
      cellCheckerHandler: (day, cell) => {
        calendar._updateDateCellStatus(day, cell);
      },
      previewCardHandler: (cardData) => {
        cardPreviewPopup.open(card, cardData);
      }
    });
    return card.generateCard();
  },
  memoryConnector: () => {
    return memory.getCurrentTasksArray();
  }
});

// Popups
const addNewTaskPopup = new PopupWithForm({
  popupSelector: '.popup-new-task',
  submitFormHandler: addNewPlaceHandler,
});
addNewTaskPopup.setEventListeners();

const cardPreviewPopup = new PopupPreview({
  popupSelector: '.popup-event-preview',

  deleteHandler: (cardToDelete, taskData) => {
    confirmPopup.open(cardToDelete, taskData);
  },
});
cardPreviewPopup.setEventListeners();

const confirmPopup = new PopupConfirm({
  popupSelector: '.popup-confirm',

  submitFormHandler: (cardToDelete, hash, date) => {
    memory.deleteTaskFromLocalStorage(hash);
    confirmPopup.close();
    setTimeout(() => {
      cardToDelete.deleteCard();
      const cell = document.querySelectorAll('.calendar__date')[date - 1];
      calendar._updateDateCellStatus(date, cell);
    }, 500);

    if (cardPreviewPopup) {
      cardPreviewPopup.close();
    }
  },
});
confirmPopup.setEventListeners();

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


// 19.04 что еще можно добавить
/*
// 1) при нажатии на корзинку (карточка + превью окно) спрашивать "Удалить это задание?"
//   -- нужно сделать верстку этого попапа (СДЕЛАЛ)
//   -- нужно сделать новый класс
//   -- нужно научить работать его с удалением
// 2) красивые анимации удаления карточки
3) кнопка редактирования таска + попап к ней + внесение данных в обратную сторону ( в память + в верстку)
4) каким то образом вставить погоду на выбранный день например (уже больше на дневник будет похоже), леша давал такой проект посмотри



*/
