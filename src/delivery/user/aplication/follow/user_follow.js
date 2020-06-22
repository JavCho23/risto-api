class UserFollow {
  constructor(repository) {
    this.repository = repository;
  }
  call(idLocal, idUser) {
    return this.repository.follow(idLocal, idUser);
  }
}

module.exports = UserFollow;
