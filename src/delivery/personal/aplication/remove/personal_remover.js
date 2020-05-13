class PersonalRemover {
  constructor(repository) {
    this.repository = repository;
  }
  call(idPersonal) {
    return this.repository.remove(idPersonal);
  }
}

module.exports = PersonalRemover;
