import Popup from './Popup.js';
export default class PopupPreview extends Popup {
  constructor({popupSelector}) {
    super(popupSelector);

    this._popupTitle = this._popupElem.querySelector('.popup-event-preview__title');
    this._popupDate = this._popupElem.querySelector('.popup-event-preview__preview-date');
    this._popupTime = this._popupElem.querySelector('.popup-event-preview__preview-time');
    this._popupDescription = this._popupElem.querySelector('.popup-event-preview__event-description');
    this._deleteButton = this._popupElem.querySelector('.popup-event-preview__delete-button');
    this._completeButton = this._popupElem.querySelector(".task-cards__complete-button");
  }
}
