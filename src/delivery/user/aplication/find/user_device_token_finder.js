class UserDeviceTokenFinder {
    constructor(repository) {
        this.repository = repository;
    }
    call(idUser) {
        return this.repository.findDeviceToken(idUser);
    }
}

module.exports = UserDeviceTokenFinder;
