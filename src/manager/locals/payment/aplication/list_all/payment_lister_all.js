class PaymentListerAll {
  constructor(repository) {
    this.repository = repository;
  }
  call() {
    return this.repository.listAll();
  }
}

module.exports = PaymentListerAll;
