class List {
    constructor(repository) {
        this.repository = repository;
    }
    call(localId) {
        return this.repository.list(localId);
    }
}

module.exports = List;
