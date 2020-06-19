class LocalGetterDeliveryPrice {
  constructor(repository) {
    this.repository = repository;
  }
  call(idLocal,paymentLister) {
    return this.repository.getDeliveryPrice(idLocal,paymentLister);
  }
}

module.exports = LocalGetterDeliveryPrice;
