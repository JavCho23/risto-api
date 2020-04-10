class QualificationGet {
    constructor(repository) {
        this.repository = repository;
    }
    call(localId) {
        return this.repository.get(localId);
    }
}

module.exports = QualificationGet;
