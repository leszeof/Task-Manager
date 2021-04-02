export default class Popup {
  constructor(popupSelector) {
    this._popupElem = document.querySelector(popupSelector);
    this._closeButtonElem = this._popupElem.querySelector('.popup__close-button');

  }
}
