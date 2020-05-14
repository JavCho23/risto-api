class ProfileListerByUser {
  constructor(repository) {
    this.repository = repository;
  }
  call(idUser, findLocation) {
    return this.repository.listByUser(idUser, findLocation);
  }
}

module.exports = ProfileListerByUser;
