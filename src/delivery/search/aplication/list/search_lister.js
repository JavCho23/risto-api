class SearchLister {
  constructor(repository) {
    this.repository = repository;
  }
  call(
    query,
    type,
    limit,
    offset,
    localFinder,
    itemFinder,
    productLister,
    tagLister,
    phoneLister,
    locationFinder,
    scheduleFinder,
    paymentsLister
  ) {
    return this.repository.list(
      query,
      type,
      limit,
      offset,
      localFinder,
      itemFinder,
      productLister,
      tagLister,
      phoneLister,
      locationFinder,
      scheduleFinder,
      paymentsLister
    );
  }
}

module.exports = SearchLister;
