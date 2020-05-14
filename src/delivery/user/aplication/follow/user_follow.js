class UserFollow {
  constructor(repository) {
    this.repository = repository;
  }
  call(idLocal, idUser) {
    return this.repository.add(idLocal, idUser);
  }
}

module.exports = UserFollow;