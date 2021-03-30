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
  cardSettings,
} from './utils/constants.js';
import Card from './components/Card.js';


// Functions
  // open popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
  // close popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
