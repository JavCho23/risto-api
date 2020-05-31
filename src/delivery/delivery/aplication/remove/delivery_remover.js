class DeliveryRemover {
  constructor(repository) {
    this.repository = repository;
  }
  call(idDelivery) {
    return this.repository.remove(idDelivery);
  }
}

module.exports = DeliveryRemover;
