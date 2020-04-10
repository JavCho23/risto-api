class QualificationGet {
    constructor(repository) {
        this.repository = repository;
    }
    call(localId) {
        return this.repository.getCommunityStats(localId);
    }
}

module.exports = QualificationGet;
