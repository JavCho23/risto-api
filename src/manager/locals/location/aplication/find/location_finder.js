class LocationFinder {
    constructor(repository) {
        this.repository = repository;
    }
    call(idLocation) {
        return this.repository.find(idLocation);
    }
}

module.exports = LocationFinder;
