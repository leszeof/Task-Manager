export default class Card {
  constructor(taskData, cardSettings) {
    this._taskDataBinding(taskData);
    this._cardSettingsBinding(cardSettings);
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

  // return template node clone for card
  _getEmptyCardClone(selector) {
    const cardItemTemplate = this._templateElem.content;
    const emptyCardElement = cardItemTemplate.querySelector(selector).cloneNode(true);

    return emptyCardElement;
  }

  // prepare card data
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

  // fill card elements (view) with data
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
}
