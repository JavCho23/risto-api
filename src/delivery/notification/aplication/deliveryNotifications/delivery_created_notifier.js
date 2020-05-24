class DeliveryCreatedNotifier {
  constructor(repository) {
    this.repository = repository;
  }
  call(idLocal, idDelivery, state, allPersonalLister, tokenDeviceFinder) {
    return this.repository.deliveryCreatedNotification(
      idLocal,
      idDelivery,
      state,
      allPersonalLister,
      tokenDeviceFinder
    );
  }
}

module.exports = DeliveryCreatedNotifier;



