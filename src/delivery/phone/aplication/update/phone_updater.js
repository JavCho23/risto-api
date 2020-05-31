class PhoneUpdater {
    constructor(repository) {
        this.repository = repository;
    }
    call(phone) {
        return this.repository.update(phone);
    }
}

module.exports = PhoneUpdater;
