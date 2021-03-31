export default class Calendar {
  constructor() {
    this._calendarDataBinding(calendarSettings);
  }

  _calendarDataBinding() {
    // список дней-дат + родительская секция
    this._calendarSection =
        document.querySelector(calendarSettings.calendarSectionSelector);
    this._calendarDaysContainer =
        this._calendarSection.querySelector(calendarSettings.calendarDayListContainerSelector);

    // контролеры календаря
      // год
    this._currentYearElem =
        this._calendarSection.querySelector(calendarSettings.currentYearSelector);
    this._yearArrowLeftElem =
        this._calendarSection.querySelector(calendarSettings.yearArrowLeftSelector);
    this._yearArrowRightElem =
        this._calendarSection.querySelector(calendarSettings.yearArrowRightSelector);

      // месяц
    this._currentMonthElem =
        this._calendarSection.querySelector(calendarSettings.currentMonthSelector);
    this._monthArrowLeftElem =
        this._calendarSection.querySelector(calendarSettings.monthArrowLeftSelector);
    this._monthArrowRightElem =
        this._calendarSection.querySelector(calendarSettings.monthArrowRightSelector);

    // служебные классы
    this._dayClass = calendarSettings.calendarDayClass;
    this._todayClass = calendarSettings.todayClass;
    this._activeDayClass = calendarSettings.activeDayClass;
    this._taskedDayClass = calendarSettings.taskedDayClass;

    // темплейт
    this._dateCellTemplateElem = document.querySelector(calendarSettings.dayTemplateSelector);

    // модальное окно с списком тасков
    this._modalWindowWithTasks =
        document.querySelector(calendarSettings.tasksForMonthWindowSelector);
    this._tasksListContainer =
        this._modalWindowWithTasks.querySelector(calendarSettings.taskListInModalWindowSelector);
    this._modalWindowTitleMonth = this._modalWindowWithTasks.querySelector(calendarSettings.modalTitleYearNameSelector);
    this._modalWindowTitleAdditional = this._modalWindowWithTasks.querySelector(calendarSettings.modalTitleMonthNameSelector);

    // проставляем слушатели на календарь
      // ! в любом другом месте его вызов (например в createCalendar или_renderCalendar) генерирует неадекватное поведение всех переключателей
    this._setEventListeners();
  }
}
