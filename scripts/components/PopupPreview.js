import Popup from './Popup.js';
export default class PopupPreview extends Popup {
  constructor({popupSelector, deleteHandler}) {
    super(popupSelector);

    this._popupSettingsBinding();

    // class callbacks
    this._deleteHandler = deleteHandler;
  }

  _popupSettingsBinding() {
    // popup elems
    this._popupTitle = this._popupElem.querySelector('.popup-event-preview__title');
    this._popupDate = this._popupElem.querySelector('.popup-event-preview__preview-date');
    this._popupTime = this._popupElem.querySelector('.popup-event-preview__preview-time');
    this._popupDescription = this._popupElem.querySelector('.popup-event-preview__event-description');
    this._completeCheckboxLabel = this._popupElem.querySelector('.popup-event-preview__label');
    this._deleteButton = this._popupElem.querySelector('.popup-event-preview__delete-button');
    this._completeButton = this._popupElem.querySelector('.task-cards__complete-button');

    // classes
    this._completeCheckboxActiveClass = 'task-cards__complete-button_active';
    this._completeTextActiveClass = 'task-cards__task_complete';
  }

  open(cardToDelete, cardData) {
    this._cardToDelete = cardToDelete;
    this._taskData = cardData;
    this._configurePopup(cardData);

    super.open();
  }

  _configurePopup({title, description, month, date, hours, minutes}) {
    this._popupTitle.textContent = title;
    this._popupDescription.textContent = description;
    this._popupDate.textContent = `${month} ${date}`;
    this._popupTime.textContent = `${hours}:${minutes}`;
  }

  setEventListeners() {
    super.setEventListeners();

    this._deleteButton.addEventListener('click', () => {
      this._deleteHandler(this._cardToDelete, this._taskData);
      // this.close();
    });

    this._completeButton.addEventListener('click', () => {
      this._completeTaskHandler();
    });
  }

  //! можно улучшить поведение
  _completeTaskHandler() {
    const alreadyActive = this._completeButton.classList.contains(this._completeCheckboxActiveClass);

    if (alreadyActive) {
      this._completeCheckboxLabel.textContent = 'не выполнено';

    } else {
      this._completeCheckboxLabel.textContent = 'выполнено';
    }

    this._completeButton.classList.toggle(this._completeCheckboxActiveClass);
    this._popupTitle.classList.toggle(this._completeTextActiveClass);
  }
}
