class DeliveryFinishNotifier {
  constructor(repository) {
    this.repository = repository;
  }
  call(idUser, idDelivery, state, event, tokenDeviceFinder) {
    return this.repository.deliveryFinishNotification(
      idUser,
      idDelivery,
      state,
      event,
      tokenDeviceFinder
    );
  }
}

module.exports = DeliveryFinishNotifier;
