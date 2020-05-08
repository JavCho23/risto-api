class Schedule {
  constructor(days) {
    this._days = days;
  }
  get status() {
    const today = new Date();
    const day = this._days[today.getDay() == 0 ? 6 : today.getDay() - 1];
    const opening = new Date("1970-01-01 " + day.opening.value);
    const closing = new Date("1970-01-01 " + day.closing.value);
    if (
      today.getHours() == opening.getHours() - 1 &&
      today.getHours() < opening.getHours()
    ) {
      return "Por abrir";
    }

    if (
      today.getHours() == closing.getHours() - 1 &&
      today.getHours() < closing.getHours()
    ) {
      return "Por cerrar";
    }

    if (opening.getHours() <= today.getHours() <= closing.getHours()) {
      return "Abierto ahora";
    }
    return "Cerrado";
  }
  toJson() {
    return this._days.map((day) => day.toJson());
  }
}

module.exports = Schedule;
