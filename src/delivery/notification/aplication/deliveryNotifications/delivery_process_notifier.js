class DeliveryProcessNotifier {
  constructor(repository) {
    this.repository = repository;
  }
  call(idUser, idDelivery, state, event, tokenDeviceFinder) {
    return this.repository.deliveryProcessNotification(
      idUser,
      idDelivery,
      state,
      event,
      tokenDeviceFinder
    );
  }
}

module.exports = DeliveryProcessNotifier;
