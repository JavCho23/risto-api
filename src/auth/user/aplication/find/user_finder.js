class UserFinder {
    constructor(repository) {
        this.repository = repository;
    }
    call(userId) {
        return  this.repository.find(userId);
    }
}

module.exports = UserFinder;
