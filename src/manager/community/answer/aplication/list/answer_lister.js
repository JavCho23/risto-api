class AnswerLister {
    constructor(repository) {
        this.repository = repository;
    }
    call(askId) {
        return this.repository.list(askId);
    }
}

module.exports = AnswerLister;
