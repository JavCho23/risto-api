class PhoneRemover {
  constructor(repository) {
    this.repository = repository;
  }
  call(idPhone) {
    return this.repository.remove(idPhone);
  }
}

module.exports = PhoneRemover;
