class LocalRemover {
    constructor(repository) {
        this.repository = repository;
    }
    call(idLocal) {
        return this.repository.remove(idLocal);
    }
}

module.exports = LocalRemover;
