class UserIsFollow {
    constructor(repository) {
        this.repository = repository;
    }
    call(idLocal, idUser) {
        return this.repository.isFollow(idLocal, idUser);
    }
}

module.exports = UserIsFollow;
