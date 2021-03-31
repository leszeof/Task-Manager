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
  colorPseudoInput,
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

import Card from './components/Card.js';
import Task from './components/Task.js';
import Calendar from './components/Calendar.js';

// Functions
  // open popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
  // close popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
