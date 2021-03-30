export default class Task {
  constructor({title, description, year, month, date, time}) {
    this._title = title;
    this._description = description;
    this._year = year;
    this._month = month;
    this._date = date;
    this._time = time;
  }

  // return data obj
  getFullTaskData() {
    const newTaskInfo = {
      'title' : this._title,
      'description' : this._description,
      'dateObj' : this._generateTaskDate(),
      'hash': this._generateHashCode(),
      'isCompleted': false,
      'isDeleted': false, //! может и не нужно
    }

    return newTaskInfo;
  }

  _generateTaskDate() {
    const dateParts = `${this._year}, ${this._month}, ${this._date}, ${this._time}:00`;

    return new Date(dateParts);
  }

  _generateHashCode() {
    //может стоит сделать так: new Date().toString()
    return this._hashCode(this._generateTaskDate());
  }

  _hashCode(data) {
    return [...data.split('')].reduce((hash, char) => {
      const charCode = char.charCodeAt(0);
      const code = ((hash<<3) - hash * 2)+charCode;

      return +code & +code;
    }, 0).toString();
  }
}
