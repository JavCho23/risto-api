class DayUpdater {
  constructor(repository) {
    this.repository = repository;
  }
  call(idLocal, day) {
    return this.repository.update(idLocal, day);
  }
}

module.exports = DayUpdater;
