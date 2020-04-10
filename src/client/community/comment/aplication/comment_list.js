class QualificationList {
    constructor(repository) {
        this.repository = repository;
    }
    call(mealId) {
        return this.repository.list(mealId);
    }
}

module.exports = QualificationList;
