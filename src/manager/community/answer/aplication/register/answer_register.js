class AnswerRegister {
    constructor(repository) {
        this.repository = repository;
    }
    call(dataAnswer) {
        return this.repository.register(dataAnswer);
    }
}

module.exports = AnswerRegister;
