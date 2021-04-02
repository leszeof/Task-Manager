import {months} from '../utils/constants.js';
export default class Card {
  constructor({taskData, cardSettings, memoryConnector, cellChecker}) {
    this._taskDataBinding(taskData);
    this._cardSettingsBinding(cardSettings);

    // class callbacks
    this._memoryConnector = memoryConnector;
    this._cellChecker = cellChecker;
  }

  // task data for current card
  _taskDataBinding(taskData) {
    this._titleText = taskData.title;
    this._descriptionText = taskData.description;
    this._dateObj = typeof taskData.dateObj === 'string' ?
                        new Date(taskData.dateObj) : taskData.dateObj;
    this._hash = taskData.hash;
    this._isCompleted = taskData.isCompleted;
  }

  // card elements (html), template and classes
  _cardSettingsBinding(cardSettings) {
    // template
    this._templateElem = document.querySelector(cardSettings.cardTemplateSelector);
    this._cardElem = this._getEmptyCardClone(cardSettings.cardSelector);

    // dom elements
    this._titleElem = this._cardElem.querySelector(cardSettings.titleSelector);
    this._dayAndMonthElem = this._cardElem.querySelector(cardSettings.daySelector);
    this._timeElem = this._cardElem.querySelector(cardSettings.timeSelector);
    this._completeButtonElem = this._cardElem.querySelector(cardSettings.completeButtonSelector);
    this._deleteButtonElem = this._cardElem.querySelector(cardSettings.deleteButtonSelector);
    this._detailsButtonElem = this._cardElem.querySelector(cardSettings.detailsButtonSelector);

    // card classes
    this._completeButtonActiveClass = cardSettings.completeButtonActiveClass;
    this._completeTitleActiveClass = cardSettings.completeTaskTitleClass;
  }

  // return template node-clone for card element
  _getEmptyCardClone(selector) {
    const cardItemTemplate = this._templateElem.content;
    const emptyCardElement = cardItemTemplate.querySelector(selector).cloneNode(true);

    return emptyCardElement;
  }

  // prepare card data for further rendering
  _getCardData() {
    return {
      title: this._titleText,
      description: this._descriptionText,
      month: this._getMonth(),
      date: this._getDay(),
      hours: this._getPrettyNums(this._getHours()),
      minutes: this._getPrettyNums(this._getMinutes()),
      hash: this._hash,
      isCompleted: this._isCompleted,
    }
  }

  _getHours() {
    return this._dateObj.getHours();
  }

  _getMinutes() {
    return this._dateObj.getMinutes();
  }

  _getDay() {
    return this._dateObj.getDate();
  }

  _getMonth() {
    return months[this._dateObj.getMonth()];
  }

  // return html presentation of task (card)
  generateCard() {
    // get card data from current task data
    const cardData = this._getCardData();

    // fill card with data
    this._renderCard(cardData);

    // set event listeners on card
    this._setEventListeners();

    return this._cardElem;
  }

  // fill elements in card with data
  _renderCard(cardData) {
    this._titleElem.textContent = cardData.title;
    this._dayAndMonthElem.textContent = `${cardData.month} ${cardData.date}`;
    this._timeElem.textContent = `${cardData.hours}:${cardData.minutes}`;
  }

  // set event listeners on card elems
  _setEventListeners() {
    // listener for "complete box" button
    this._completeButtonElem.addEventListener('click', () => {
      this._markAsDone();
    });

    // listener for "show details" button
    this._detailsButtonElem.addEventListener('click', () => {
      this._openCardDetails();
    })

    // listener for "delete" button
    this._deleteButtonElem.addEventListener('click', () => {
      this._deleteButtonHandler();
    })
  }

  // event handlers
    // "complete" button
  _markAsDone() {
    this._completeButtonElem.classList.toggle(this._completeButtonActiveClass);
    this._titleElem.classList.toggle(this._completeTitleActiveClass);
  }

    // "view details" button
  _openCardDetails() {
    // get full card data
    const cardData = this._getCardData();

    // fill preview popup with card data
    generatePreviewPopup(cardData);

    openPopup(eventPreviewPopup);
  }

  _deleteButtonHandler() {
    // delete card
    this._cardElem.remove();

    // delete task from calendar memory using hash (use callback function)
    this._memoryConnector(this._hash);

    // re-render calendar
    const day = this._getDay();
    const cell = document.querySelectorAll('.calendar__date')[day - 1];
    // calendar._updateDateCellStatus(day, cell);
    this._cellChecker(day, cell);
  }

  //! в теории можно вынести из класса в utils.js
  _getPrettyNums(time) {
    if (time < 10) {
      return `0${time}`
    } else {
      return time;
    }
  }
}


//! карта использования функций
/*
constructor
  _taskDataBinding
  _cardSettingsBinding

generateCard
  _getCardData
    _getCardData
      _getHours
      _getMinutes
      _getDay
      _getMonth

  _renderCard

  _setEventListeners
    _markAsDone
    _openCardDetails
    _deleteButtonHandler
      _memoryConnector (callback)
      _cellChecker (callback)

*/
