class PhoneLister {
    constructor(repository) {
        this.repository = repository;
    }
    call(idLocation) {
        return this.repository.list(idLocation);
    }
}

module.exports = PhoneLister;
