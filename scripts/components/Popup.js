export default class Popup {
  constructor(popupSelector) {
    this._popupElem = document.querySelector(popupSelector);
    this._closeButtonElem = this._popupElem.querySelector('.popup__close-button');

  }

  // open popup
  open() {
    this._popupElem.classList.add('popup_opened');

    // close popup on escape listener
    document.addEventListener('keydown', this._handleEscClose);
  }

  // close popup
  close() {
    this._popupElem.classList.remove('popup_opened');

    // delete close popup on escape listener
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
