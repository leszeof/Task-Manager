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

    // работа с карточками в списке заданий
      // фильтрация -> сортировка -> рендеринг -> рефреш картинки
    this._openSheduleForSelectedMonth();
  }

  // main function for calendar table initialization
  createCalendarTable(year, month) {
    // prepare data for calendar
    this._prepareDataForCalendar(year, month);

    // render calendar
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

  // highlight today day in calendar
  _markTodayInCalendar() {
    const today = new Date().getDate();
    const allDays = this._calendarDaysContainer.querySelectorAll(`.${this._dayClass}`);
    allDays[today - 1].classList.add(this._todayClass);
  }

  _setEventListeners() {
    // месяц, стрелка влево
    this._monthArrowLeftElem.addEventListener('click', () => {
      // смена месяца + ре-рендеринг календаря (дат)
      this._changeMonth(this._monthArrowLeftElem.id);
    });

    // месяц, стрелка вправо
    this._monthArrowRightElem.addEventListener('click', () => {
      // смена месяца + ре-рендеринг календаря (дат)
      this._changeMonth(this._monthArrowRightElem.id);
    });

    // год, стрелка влево
    this._yearArrowLeftElem.addEventListener('click', () => {
      // смена года + ре-рендеринг календаря (дат)
      this._changeYear(this._yearArrowLeftElem.id);
    });

    // год, стрелка вправо
    this._yearArrowRightElem.addEventListener('click', () => {
      // смена года + ре-рендеринг календаря (дат)
      this._changeYear(this._yearArrowRightElem.id);
    });

    // дни-даты (делегирование на контейнер)
      // пометить выбранный день + открыть расписание на него
    this._calendarDaysContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains(this._dayClass)) {
        const dayCell = event.target;
        this._toggleActiveDay(dayCell);

        this._openSheduleForSelectedDay(dayCell.textContent);
      };
    })

    // открыть расписание на выбранный месяц
    this._currentMonthElem.addEventListener('click', () => {
      this._openSheduleForSelectedMonth();
    })
  }

  // Event handlers
    // change month
  _changeMonth(arrowId) {
    const yearValue = this._year;
    let monthValue = this._monthNumber;

    if (arrowId === 'month-left-arrow') {
      // при достижении левого предела массива месяцев
      monthValue = monthValue === 0 ? monthValue = 12 : monthValue = monthValue;

      // погрешность с номерами месяцев, исправляем порядковый номер
      monthValue = monthValue - 1;

    } else {
      // при достижении правого предела массива месяцев
      monthValue = monthValue === 11 ? monthValue = -1 : monthValue = monthValue;

      // погрешность с номерами месяцев, исправляем порядковый номер
      monthValue = monthValue + 1;
    }

    // обнуляем верстку календаря
    this._resetCalendarTableRender();

    // создаем новый календарь
    this.createCalendarTable(yearValue, monthValue);

    // открываем таски на новый месяц
    this._openSheduleForSelectedMonth();
  }

    // change year
  _changeYear(arrowId) {
    const yearValue = arrowId === 'year-left-arrow' ? +this._year - 1 : +this._year + 1;

    const monthValue = this._monthNumber;

    // обнуляем верстку календаря
    this._resetCalendarTableRender();

    // создаем новый календарь
    this.createCalendarTable(yearValue, monthValue);

    // открываем таски на новый месяц
    this._openSheduleForSelectedMonth();
  }

    // toogle day as active on click
  _toggleActiveDay(currentDateCell) {
    const previousActiveDateCell = this._calendarDaysContainer.querySelector(`.${this._activeDayClass}`);

    if (previousActiveDateCell) {
      previousActiveDateCell.classList.toggle(this._activeDayClass);
    }

    if (currentDateCell) {
      currentDateCell.classList.toggle(this._activeDayClass);
    }
  }

  _openSheduleForSelectedDay(dayNum) {
    //! _openSheduleForSelectedMonth _openSheduleForSelectedDay одинаковое
    // настройка окна с тасками (заголовки)
    this._renderTitles(dayNum);

    // подготовка данных к рендерингу (фильтрация + сортировка тасков на выбранный день)
    const correctTasksArray = this._prepareDataForCardsRendering(dayNum);

    // сделать рендеринг данных (правильные таски => карточки)
    const readyCards = this.renderCards(correctTasksArray);

    // передаем их на отрисовку
    this._refreshTaskList(readyCards);
  }

  _openSheduleForSelectedMonth() {
    // снимаем отметку с активного дня
    this._toggleActiveDay();

    //! _openSheduleForSelectedMonth _openSheduleForSelectedDay одинаковое
    // настройка окна (тексты)
    this._renderTitles(this._year);

    // подготовка данных к рендерингу (фильтрация + сортировка тасков на выбранный месяц)
    const correctTasksArray = this._prepareDataForCardsRendering();

    // сделать рендеринг данных (правильные таски => карточки)
    const readyCards = this.renderCards(correctTasksArray);

    // передаем их на отрисовку
    this._refreshTaskList(readyCards);
  }

  // configure titles in task list
  _renderTitles(value) {
    this._modalWindowTitleMonth.textContent = value;
    this._modalWindowTitleAdditional.textContent = this._monthName;
  }

  _prepareDataForCardsRendering(day) {
    // берем "сырой" массив из памяти
    const dirtyTasksArray = memory.getCurrentTasksArray();

    // фильтруем таски по дню или месяцу
    const filteredTasksArray = this._filterTasks(day, dirtyTasksArray);

    // отсортировать по хронологии отфильтрованный массив тасков
    const sortedTasksArray = filteredTasksArray.sort(this._sortTasksArray);

    return sortedTasksArray;
  }

  //! фильтрация -> сортировка -> рендеринг -> обновление отображения
    // фильтрация
  _filterTasks(day = undefined, dirtyTasksArray) {
    let min;
    let max;

    if (day != undefined) {
      // фильтрация (по дню)
      min = new Date(this._year, this._monthNumber, day);
      max = new Date(this._year, this._monthNumber, +day, 23, 59, 59);

    } else {
      //фильтрация (по месяцу)
      min = new Date(this._year, +this._monthNumber);
      max = new Date(this._year, +this._monthNumber + 1);
    }

    return dirtyTasksArray.filter(taskItem => {
      const taskDate = new Date(taskItem.dateObj);

      // вернутся только те таски, которые удовлетворяют условию
      return taskDate >= min && taskDate <= max
    })
  }

    // сортировка
  _sortTasksArray(taskA, taskB) {
    if (taskA.dateObj > taskB.dateObj) {
      return 1;
    }
    if (taskA.dateObj < taskB.dateObj) {
      return -1;
    }

    return 0;
  }

}

//! идея по упрощению:
// вынести все прочие this моменты в одну функцию (число дней в месяце, какой день "today" и тд)
  // например засунуть их в _prepareDataForCalendar
  // достать из:
  // разбить _changeMonth и _changeYear на мелкие кусочки!




// карта использования функций в календаре
/*

constructor
  init
    createCalendarTable
    _openSheduleForSelectedMonth

  _calendarDataBinding
    _setEventListeners
    1)_changeMonth
        _resetCalendarTableRender
        createCalendarTable
        _openSheduleForSelectedMonth

    2)_changeYear
        _resetCalendarTableRender
        createCalendarTable
        _openSheduleForSelectedMonth

    3)(_toggleActiveDay + _openSheduleForSelectedDay)

    4)_openSheduleForSelectedMonth


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


*НА ДЕНЬ
_openSheduleForSelectedDay
  _renderTitles

  _prepareDataForCardsRendering
    memory.getCurrentTasksArray
    _filterTasks
    _sortTasksArray

  renderCards
  _refreshTaskList


*НА МЕСЯЦ
_openSheduleForSelectedMonth
  _toggleActiveDay
  _renderTitles

  _prepareDataForCardsRendering
    memory.getCurrentTasksArray
    _filterTasks
    _sortTasksArray

  renderCards
  _refreshTaskList





*/
