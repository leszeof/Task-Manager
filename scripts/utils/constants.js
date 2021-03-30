// Add new task popup
const newTaskPopup = document.querySelector('.popup_new-task');
const openNewTaskPopupButton = document.querySelector('.header__add-button');
const closeNewTaskPopupButton = newTaskPopup.querySelector('.popup__close-button');
const newTaskFormElement = newTaskPopup.querySelector('.popup__new-task-form');
const topicInput = newTaskFormElement.querySelector('.popup__topic');
const descriptionInput = newTaskFormElement.querySelector('.popup__description');
const dateInput = newTaskFormElement.querySelector('.popup__date');
const monthInput = newTaskFormElement.querySelector('.popup__month');
const yearInput = newTaskFormElement.querySelector('.popup__year');
const timeInput = newTaskFormElement.querySelector('.popup__time');
const colorInput = newTaskFormElement.querySelector('.popup__color');
const colorPseudoInput = newTaskFormElement.querySelector('.popup__pseudo-input');

// Preview task popup
const eventPreviewPopup = document.querySelector('.popup-event-preview');
const popupTitleElem = eventPreviewPopup.querySelector('.popup-event-preview__title');
const popupDateElem = eventPreviewPopup.querySelector('.popup-event-preview__preview-date');
const popupTimeElem = eventPreviewPopup.querySelector('.popup-event-preview__preview-time');
const popupDescription = eventPreviewPopup.querySelector('.popup-event-preview__event-description');
const closeEventPreviewPopupButton = eventPreviewPopup.querySelector('.popup__close-button_event-preview');
const deleteEventPreviewButton = document.querySelector('.popup-event-preview__delete-button');
const completeEventPreviewPopupButton = eventPreviewPopup.querySelector(".task-cards__complete-button");

const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
