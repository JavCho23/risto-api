class ScoreList {
    constructor(repository) {
        this.repository = repository;
    }
    call(idQualification) {
        return this.repository.listQualificationScore(idQualification);
    }
}

module.exports = ScoreList;
