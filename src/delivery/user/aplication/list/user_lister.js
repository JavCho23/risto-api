class UserLister {
    constructor(repository) {
        this.repository = repository;
    }
    call(query) {
        return this.repository.follow(query);
    }
}

module.exports = UserLister;
