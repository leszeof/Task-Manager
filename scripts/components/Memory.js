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
    //! было
    // const arrayOfTasks = localStorage.getItem('calendarMemory') || '[]';
    // // console.log(arrayOfTasks);
    // return JSON.parse(arrayOfTasks);

    // а по моему надо вот так
    console.log(this._dataTasksArray);
    return this._dataTasksArray;
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

  deleteTaskFromLocalStorage(hash) {

    this._dataTasksArray.splice(indexOfTaskInArray, 1);

    for (let i = 0; i < this._dataTasksArray.length; i++) {
      if (this._dataTasksArray[i].hash == hash) {

        this._dataTasksArray.splice(i, 1);
      }
    }

    this._updateLocalStorage();
  }
}

//! карта использования функцй
/*

init
  -устанавлвиает значение в localStorage
  -перекачивает его в оперативный массив (конструктор)

getCurrentTasksArray

saveTask
  _saveTaskToLocalMemory
  _updateLocalStorage




 */
