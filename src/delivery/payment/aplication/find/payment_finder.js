class PaymentFinder {
  constructor(repository) {
    this.repository = repository;
  }
  call(idPayment) {
    return this.repository.find(idPayment);
  }
}

module.exports = PaymentFinder;
