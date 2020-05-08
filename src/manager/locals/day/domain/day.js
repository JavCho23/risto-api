const days = require("../infrastructure/persistence/days.json");

class Day {
  constructor(day, opening, closing) {
    this._day = day;
    this._opening = opening;
    this._closing = closing;
  }
  get opening() {
    return this._opening;
  }
  get closing() {
    return this._closing;
  }
  toJson() {
    return {
      day: days[this._day.value],
      opening: this._opening.value,
      closing: this._closing.value,
    };
  }
}

module.exports = Day;
