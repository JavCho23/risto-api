class LocationAdder {
    constructor(repository) {
        this.repository = repository;
    }
    call(location) {
        return this.repository.add(location);
    }
}

module.exports = LocationAdder;
