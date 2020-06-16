class LocalListerPopular {
  constructor(repository) {
    this.repository = repository;
  }
  call(
    limit,
    offset,
    phoneLister,
    locationFinder,
    scheduleFinder,
    paymentLister
  ) {
    return this.repository.listPopular(
      limit,
      offset,
      phoneLister,
      locationFinder,
      scheduleFinder,
      paymentLister
    );
  }
}

module.exports = LocalListerPopular;
