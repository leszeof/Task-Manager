export default class Popup {
  constructor(popupSelector) {
    this._popupElem = document.querySelector(popupSelector);
    this._closeButtonElem = this._popupElem.querySelector('.popup__close-button');

    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeOnOverlayClick = this._closeOnOverlayClick.bind(this);
  }

  // open popup
  open() {
    this._popupElem.classList.add('popup_opened');

    // close popup on escape listener
    document.addEventListener('keydown', this._handleEscClose);
  }

  // close popup
  close() {
    console.log('tyt');
    this._popupElem.classList.remove('popup_opened');

    // delete close popup on escape listener
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // close popup on 'escape' press
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      const curentOpenedPopup = document.querySelector('.popup_opened');
      this.close(curentOpenedPopup);
    }
  }

  // set eventlisteners on popup
  setEventListeners() {
    // close popup on overlay click listener
    this._popupElem.addEventListener('click', this._closeOnOverlayClick);

    // close popup on close button listener
    this._closeButtonElem.addEventListener('click', this.close.bind(this));
  }

  // close popup on overlay click
  _closeOnOverlayClick(event) {
    if (event.currentTarget == event.target) {
      this.close();
    }
  }
}
