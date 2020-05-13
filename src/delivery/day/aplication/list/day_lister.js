class DayLister {
  constructor(repository) {
    this.repository = repository;
  }
  call(idLocal) {
    return this.repository.list(idLocal);
  }
}

module.exports = DayLister;
