class PaymentListerByLocal {
  constructor(repository) {
    this.repository = repository;
  }
  call(idLocation) {
    return this.repository.listByLocal(idLocation);
  }
}

module.exports = PaymentListerByLocal;
