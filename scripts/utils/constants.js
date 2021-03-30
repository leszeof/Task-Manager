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
