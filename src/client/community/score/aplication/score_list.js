class ScoreList {
    constructor(repository) {
        this.repository = repository;
    }
    call(idQualification) {
        return this.repository.list(idQualification);
    }
}

module.exports = ScoreList;
