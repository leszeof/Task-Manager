import Popup from './Popup.js';
export default class PopupWithForm extends Popup{
  constructor({popupSelector, submitFormHandler}) {
    super(popupSelector);

    this._popupForm = this._popupElem.querySelector('.popup__form');
    this._inputList = this._popupElem.querySelectorAll('.popup-form__input');

    this._submitFormHandler = submitFormHandler;
  }
}
