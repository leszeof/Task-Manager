export default class Memory {
  constructor() {
    // оперативный массив скрипта
    this._dataTasksArray = [];

    this.init();
  }

  init() {
    // возьмет из localStorage сохраненный массив тасков по ключу calendarMemory
    // если его там нет - создаем пустой массив
    const tasksArr = localStorage.getItem('calendarMemory') || '[]';

    // запишет взятый массив в нашу временную память
    // или поставит пустой массив как стартовый
    this._dataTasksArray = JSON.parse(tasksArr);
  }

  saveTask(newTask) {
    this._saveTaskToLocalMemory(newTask);

    this._updateLocalStorage();
  }

  // публичный метод будет отдавать функциям рендеринга массив, чтобы они не лазили в него
  getCurrentTasksArray() {
    const arrayOfTasks = localStorage.getItem('calendarMemory') || '[]';
    // console.log(arrayOfTasks);
    return JSON.parse(arrayOfTasks);
  }
}
