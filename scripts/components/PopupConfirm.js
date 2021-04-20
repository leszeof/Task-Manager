import Popup from './Popup.js';
class PopupWithConfirm extends Popup {
  constructor({popupSelector, submitFormHandler}) {
    super(popupSelector);

    this._popupForm = this._popupElem.querySelector('.popup__form');
    this._submitButton = this._popupForm.querySelector('.popup-confirm__submit-button');

    this._submitFormHandler = submitFormHandler;
  }

  open(cardToDelete, cardID) {
    super.open();
    this._cardToDelete = cardToDelete;
    this._cardID = cardID;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitFormHandler(this._cardToDelete, this._cardID);
    });
  }
}

export default PopupWithConfirm;
