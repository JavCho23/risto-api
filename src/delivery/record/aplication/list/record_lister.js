class RecordLister {
  constructor(repository) {
    this.repository = repository;
  }
  call(idLocation, days) {
    return this.repository.list(idLocation, days);
  }
}

module.exports = RecordLister;
