import Popup from './Popup.js';
export default class PopupWithForm extends Popup{
  constructor({popupSelector, submitFormHandler}) {
    super(popupSelector);

    this._popupForm = this._popupElem.querySelector('.popup__form');
    this._inputList = this._popupElem.querySelectorAll('.popup-form__input');

    this._submitFormHandler = submitFormHandler;
  }

  // get all input values
  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    // console.log(this._formValues);
    return this._formValues;
  }

  // close popup with additional functionality
  close() {
    super.close();
    this._popupForm.reset();
  }
}
