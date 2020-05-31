class ProfileRemover {
    constructor(repository) {
        this.repository = repository;
    }
    call(idProfile) {
        return this.repository.remove(idProfile);
    }
}

module.exports = ProfileRemover;
