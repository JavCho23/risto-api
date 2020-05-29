class RecordAdder {
  constructor(idUser, repository) {
    this.repository = repository;
    this.idUser = idUser;
  }
  call(description, idLocal) {
    return this.repository.add(this.idUser, description, idLocal);
  }
}

module.exports = RecordAdder;
