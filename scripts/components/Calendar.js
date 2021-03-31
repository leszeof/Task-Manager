export default class Calendar {
  constructor() {
    this._calendarDataBinding(calendarSettings);
  }

  // binding calendar elements and classes
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

  init() {

  }

  // main function for calendar table
  createCalendarTable(year, month) {
    // prepare data for calendar
    this._prepareDataForCalendar(year, month);

    // render clendar
    this._renderCalendarTable();
  }

  // prepare data for calendar rendering
  _prepareDataForCalendar(year, month) {
    // определяем количество дней в месяце
    this._totalDaysInMonth = 32 - new Date(year, month, 32).getDate();

    // определяет день недели с которой начнется месяц
    this._serialNumOfFirstDayInMonth = new Date(year, month).getUTCDay();

    // подготовливаем данные для this и рендеринга
    this._year = year;
    this._monthNumber = month;
    this._monthName = months[this._monthNumber];
      //! наверное лучше будет как то привязать к классу массив месяцев (или передать или создать внутри)

    // подготовка к подсветке дней в которых есть задания
    this._findAllDaysWithTasksForSelectedPeriod();
  }

  // prepare data for highlighting days with tasks while render calendar
  _findAllDaysWithTasksForSelectedPeriod() {
    // find all days with tasks (high % of repetitions in this array)
    this._listOfDaysWithTasks = this._getSerialNumbersOfDaysWithTasks();

    // array with unique serial numbers of days with tasks
    this._listOfUniqueDaysWithTasks = this._leaveOnlyUniqueDaysWithTask();
  }

  // return array of days with tasks
  _getSerialNumbersOfDaysWithTasks() {
    const taskArray = memory.getCurrentTasksArray();
    const arrayOfTasksForSelectedMonth = this._filterTasksByMonth(taskArray);

    const arrayOfDaysWithTasks = arrayOfTasksForSelectedMonth.map(taskObj => {
      return new Date(taskObj.dateObj).getDate();
    });

    return arrayOfDaysWithTasks; // array with not unique numbers
  }

  // return array with unique serial numbers of days with tasks
  _leaveOnlyUniqueDaysWithTask() {
    const uniqueSetOfDaysWithTasks = new Set(this._listOfDaysWithTasks);

    return Array.from(uniqueSetOfDaysWithTasks); // array with unique numbers
  }

}
