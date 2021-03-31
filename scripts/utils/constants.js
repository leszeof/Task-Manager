// Add new task popup
export const newTaskPopup = document.querySelector('.popup_new-task');
export const openNewTaskPopupButton = document.querySelector('.header__add-button');
export const closeNewTaskPopupButton = newTaskPopup.querySelector('.popup__close-button');
export const newTaskFormElement = newTaskPopup.querySelector('.popup__new-task-form');
export const topicInput = newTaskFormElement.querySelector('.popup__topic');
export const descriptionInput = newTaskFormElement.querySelector('.popup__description');
export const dateInput = newTaskFormElement.querySelector('.popup__date');
export const monthInput = newTaskFormElement.querySelector('.popup__month');
export const yearInput = newTaskFormElement.querySelector('.popup__year');
export const timeInput = newTaskFormElement.querySelector('.popup__time');
export const colorInput = newTaskFormElement.querySelector('.popup__color');
export const colorPseudoInput = newTaskFormElement.querySelector('.popup__pseudo-input');

// Preview task popup
export const eventPreviewPopup = document.querySelector('.popup-event-preview');
export const popupTitleElem = eventPreviewPopup.querySelector('.popup-event-preview__title');
export const popupDateElem = eventPreviewPopup.querySelector('.popup-event-preview__preview-date');
export const popupTimeElem = eventPreviewPopup.querySelector('.popup-event-preview__preview-time');
export const popupDescription = eventPreviewPopup.querySelector('.popup-event-preview__event-description');
export const closeEventPreviewPopupButton = eventPreviewPopup.querySelector('.popup__close-button_event-preview');
export const deleteEventPreviewButton = document.querySelector('.popup-event-preview__delete-button');
export const completeEventPreviewPopupButton = eventPreviewPopup.querySelector(".task-cards__complete-button");

export const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

// classes and selectors for Card class
export const cardSettings = {
  // селекторы
  cardSelector : '.task-cards__card_selected-day',
  titleSelector : '.task-cards__task',
  daySelector : '.task-cards__date',
  timeSelector : '.task-cards__time',
  completeButtonSelector : '.task-cards__complete-button',
  deleteButtonSelector : '.task-cards__delete-button',
  detailsButtonSelector : '.task-cards__details',

  // темплейты
  cardTemplateSelector : '.template-task-card-big',

  // классы
  completeButtonActiveClass : 'task-cards__complete-button_active',
  completeTaskTitleClass : 'task-cards__task_complete',
}

// classes and selectors for Calendar class
export const calendarSettings = {
  // список дней-дат + родительская секция
  calendarSectionSelector : '.calendar',
  calendarDayListContainerSelector : '.calendar__dates-list',

  // контролы календаря
    // год
  currentYearSelector : '#year',
  yearArrowLeftSelector : '#year-left-arrow',
  yearArrowRightSelector : '#year-right-arrow',

    // месяц
  currentMonthSelector : '#month',
  monthArrowLeftSelector : '#month-left-arrow',
  monthArrowRightSelector : '#month-right-arrow',

  // темплейты
  dayTemplateSelector: '.template-calendar-date',

  // служебные классы
  calendarDayClass : 'calendar__date',
  todayClass : 'today',
  activeDayClass : 'calendar__date_active',
  taskedDayClass: 'tasked-day',

  //! надо создать отдельный класс для модальных окон, чтобы разгрузить класс Календарь
  // модальные окна
    // дела на месяц
  tasksForMonthWindowSelector : '.task-cards_selected-month',
  taskListInModalWindowSelector : '.task-cards__container',

    // дела на выбранный день
  tasksForDayhWindowSelector : '.task-cards_selected-day',

    // общее для 2 модальных окон
  modalTitleYearNameSelector : '.task-cards__title-year',
  modalTitleMonthNameSelector : '.task-cards__title-month',
  modalTitleDateNameSelector : '.task-cards__title-day',
}
