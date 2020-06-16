class LocalGetterDeliveryPrice {
  constructor(repository) {
    this.repository = repository;
  }
  call(idLocal) {
    return this.repository.getDeliveryPrice(idLocal);
  }
}

module.exports = LocalGetterDeliveryPrice;
