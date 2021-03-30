export default class Card {
  constructor(taskData, cardSettings) {
    this._taskDataBinding(taskData);
    this._cardSettingsBinding(cardSettings);
  }

  _taskDataBinding(taskData) {
    this._titleText = taskData.title;
    this._descriptionText = taskData.description;
    this._dateObj = typeof taskData.dateObj === 'string' ?
                        new Date(taskData.dateObj) : taskData.dateObj;
    this._hash = taskData.hash;
    this._isCompleted = taskData.isCompleted;
  }

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
}
