export default class Memory {
  constructor() {
    // оперативный массив скрипта
    this._dataTasksArray = [];

    this.init();
  }

  init() {
    // возьмет из localStorage сохраненный массив тасков по ключу calendarMemory
    // если его там нет (ключа или значения) - создаем пустой массив
    const tasksArr = localStorage.getItem('calendarMemory') || '[]';

    // запишет взятый массив в нашу временную память
    // или поставит пустой массив как стартовый
    this._dataTasksArray = JSON.parse(tasksArr);
  }
}
