export default class Task {
  constructor({title, description, year, month, date, time}) {
    this._title = title;
    this._description = description;
    this._year = year;
    this._month = month;
    this._date = date;
    this._time = time;
  }

  getFullTaskData() {}

  _generateTaskDate() {}

  _generateHashCode() {}

  _hashCode(data) {
    return [...data.split('')].reduce((hash, char) => {
      const charCode = char.charCodeAt(0);
      const code = ((hash<<3) - hash * 2)+charCode;

      return +code & +code;
    }, 0).toString();
  }
}
