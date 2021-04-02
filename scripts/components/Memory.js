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

  // публичный метод будет отдавать функциям рендеринга массив, чтобы они не лазили в него
  getCurrentTasksArray() {
    const arrayOfTasks = localStorage.getItem('calendarMemory') || '[]';
    // console.log(arrayOfTasks);
    return JSON.parse(arrayOfTasks);
  }

  saveTask(newTask) {
    this._saveTaskToLocalMemory(newTask);

    this._updateLocalStorage();
  }

  _saveTaskToLocalMemory(currentTask) {
    this._dataTasksArray.push(currentTask);
  }

  _updateLocalStorage() {
    // присваиваем наш оперативный массив в localStorage для уже созданного ключа
    // к сожалению придется гонять массив this._dataTasksArray постоянно туда-сюда
    localStorage.setItem('calendarMemory', JSON.stringify(this._dataTasksArray));
  }
}
