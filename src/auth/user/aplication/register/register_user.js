
class RegisterUser {
    constructor(repository) {
        this._repository = repository;
    }
    async call(dataUser) {
        return this._repository.register(dataUser);
    }

}

module.exports = RegisterUser;
