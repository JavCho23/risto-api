class RecordAdder {
  constructor(idUser, repository) {
    this.repository = repository;
    this.idUser = idUser;
  }
  call(description) {
    return this.repository.add(this.idUser, description);
  }
}

module.exports = RecordAdder;
