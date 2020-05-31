class LocalRenamer {
    constructor(repository) {
        this.repository = repository;
    }
    call(idLocal, name) {
        return this.repository.rename(idLocal, name);
    }
}

module.exports = LocalRenamer;
