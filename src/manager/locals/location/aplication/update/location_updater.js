class LocationUpdater {
  constructor(repository) {
    this.repository = repository;
  }
  call(idLocation, location) {
    return this.repository.update(idLocation, location);
  }
}

module.exports = LocationUpdater;
