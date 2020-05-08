class Schedule {
  constructor(days) {
    this._days = days;
  }
  get status() {
    return "Cerrado";
  }
  toJson() {
    return this._days.map((day) => day.toJson());
  }
}

module.exports = Schedule;
