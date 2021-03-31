export default class Calendar {
  constructor() {
    this._calendarDataBinding(calendarSettings);

    this.init();
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
    // календарь
      // создаем верстку дат, отмечаем нынешний день, отмечаем дни в которых есть дела
      this.createCalendarTable(new Date().getFullYear(), new Date().getMonth());

    //! ЕЩЕ НАДО!
  }

  // main function for calendar table
  createCalendarTable(year, month) {
    // prepare data for calendar
    this._prepareDataForCalendar(year, month);

    // render clendar
    this._renderCalendar();
  }

  // prepare data for calendar rendering
  _prepareDataForCalendar(year, month) {
    // определяем количество дней в месяце
    this._totalDaysInMonth = 32 - new Date(year, month, 32).getDate();

    // определяет номер дня недели с которой начнется месяц
    this._serialNumOfFirstDayInMonth = new Date(year, month).getUTCDay();

    // подготовливаем данные для this и рендеринга
    this._year = year;
    this._monthNumber = month;
    this._monthName = months[this._monthNumber];
      //! наверное лучше будет как то привязать к классу массив месяцев (или передать или создать внутри)

    // собираем инфу про данные о днях в которых есть таски
    this._findAllDaysWithTasksForSelectedPeriod();
  }

  // prepare data for highlighting days with tasks while render calendar
  _findAllDaysWithTasksForSelectedPeriod() {
    // find all days with tasks (high % of repetitions in this array)
    this._listOfDaysWithTasks = this._getSerialNumbersOfDaysWithTasks();

    // array with unique serial numbers of days with tasks
    this._listOfUniqueDaysWithTasks = this._getUniqueSerialNumbers();
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
  _getUniqueSerialNumbers() {
    const uniqueSetOfDaysWithTasks = new Set(this._listOfDaysWithTasks);

    return Array.from(uniqueSetOfDaysWithTasks); // array with unique numbers
  }

  _renderCalendar() {
    // заполняем заголовки календаря
    this._renderCalendarHeaders();

    // начинаем непосредственное заполнение ячеек
    this._renderCalendarTable();
  }

  // render calendar titles
  _renderCalendarHeaders() {
    // подставляем текущий год как нынешний
    this._currentYearElem.textContent = this._year;

    // подставляем текущий месяц как нынешний
    this._currentMonthElem.textContent = this._monthName;
  }

  // render calendar cells
  _renderCalendarTable() {
    // сначала закинем пустые ячейки, если они есть
    this._insertBlankСells();

    // заполняем днями-датами все остальные ячейки
    this._insertDateCells();

    // если отрисованный месяц и год - это текущий, отметить в нем сегодняшний день
    if (this._monthNumber == new Date().getMonth() &&
        this._year == new Date().getFullYear()) {
      this._markTodayInCalendar();
    }
  }

  _insertBlankСells() {
    if (this._serialNumOfFirstDayInMonth !== 0) {

      for (let i = 0; i < this._serialNumOfFirstDayInMonth; i++) {
        // создаем пустые ячейки и размещаем в контейнере
        const emptyCell = document.createElement('li');
        this._calendarDaysContainer.append(emptyCell);
      }
    }
  }

  _insertDateCells() {
    for (let i = 1; i <= this._totalDaysInMonth; i++) {
      // берем темплейт и клонируем его
      const dateCell = this._getDateCellClone();
      // const dateCell = this._dateCellElem;

      // вносим номер дня месяца текстом в ячейку
      dateCell.textContent = i;

      // если на этом дне есть задания - пометим его
        // если массив дат с заданиями не пустой И номер i дня есть в массиве уникальных дат (дни с заданиями)
      if (this._listOfDaysWithTasks && this._listOfUniqueDaysWithTasks.includes(i)) {
        dateCell.classList.toggle(this._taskedDayClass)
      }

      // закидываем в верстку ячейку
      this._calendarDaysContainer.append(dateCell);
    }
  }

  // return clone of date cell template
  _getDateCellClone() {
    const emptyDateCell = this._dateCellTemplateElem.content.querySelector(`.${this._dayClass}`).cloneNode(true);

    return emptyDateCell;
  }

  // подсветим сегодняшний день при загрузке и дальнейших переключениях
  _markTodayInCalendar() {
    const today = new Date().getDate();
    const allDays = this._calendarDaysContainer.querySelectorAll(`.${this._dayClass}`);
    allDays[today - 1].classList.add(this._todayClass);
  }

}


// карта использования функций в календаре
/*

constructor
  init
  _calendarDataBinding

createCalendarTable
  1) _prepareDataForCalendar
      _findAllDaysWithTasksForSelectedPeriod
        _getSerialNumbersOfDaysWithTasks
        _getUniqueSerialNumbers

  2) _renderCalendar
      _renderCalendarHeaders

      _renderCalendarTable
        _insertBlankСells
        _insertDateCells
          _getDateCellClone
        _markTodayInCalendar


*/
