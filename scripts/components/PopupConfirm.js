import Popup from './Popup.js';
class PopupConfirm extends Popup {
  constructor({popupSelector, submitFormHandler}) {
    super(popupSelector);

    this._popupForm = this._popupElem.querySelector('.popup__form');
    this._submitButton = this._popupForm.querySelector('.popup-confirm__submit-button');

    this._submitFormHandler = submitFormHandler;
  }

  open(cardToDelete, {hash, date}) {
    super.open();
    this._cardToDelete = cardToDelete;
    this._date = date;
    this._cardHash = hash;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitFormHandler(this._cardToDelete, this._cardHash, this._date);
    });
  }
}

export default PopupConfirm;
