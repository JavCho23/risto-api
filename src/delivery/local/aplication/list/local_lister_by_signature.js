class LocalListerBySignature {
  constructor(repository) {
    this.repository = repository;
  }
  call(idSignature, phoneLister, findLocation, scheduleLister, paymentsLister) {
    return this.repository.listBySignature(
      idSignature,
      phoneLister,
      findLocation,
      scheduleLister,
      paymentsLister
    );
  }
}

module.exports = LocalListerBySignature;
