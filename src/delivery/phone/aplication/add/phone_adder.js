class PhoneAdder {
    constructor(repository) {
        this.repository = repository;
    }
    call(idLocal, phone) {
        return this.repository.add(idLocal, phone);
    }
}

module.exports = PhoneAdder;
