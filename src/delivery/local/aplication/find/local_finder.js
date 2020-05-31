class LocalFinder {
    constructor(repository) {
        this.repository = repository;
    }
    call(idLocal, phoneLister, findLocation, scheduleLister, paymentsLister) {
        return this.repository.find(
            idLocal,
            phoneLister,
            findLocation,
            scheduleLister,
            paymentsLister
        );
    }
}

module.exports = LocalFinder;
