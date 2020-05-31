class LocalListerBySignature {
    constructor(repository) {
        this.repository = repository;
    }
    call(
        location,
        limit,
        offset,
        phoneLister,
        locationFinder,
        scheduleFinder,
        paymentLister
    ) {
        return this.repository.listNear(
            location,
            limit,
            offset,
            phoneLister,
            locationFinder,
            scheduleFinder,
            paymentLister
        );
    }
}

module.exports = LocalListerBySignature;
