class DeliveryStateChanger {
  constructor(repository) {
    this.repository = repository;
  }
  call(
    state,
    idDelivery,
    deliveryCancelNotification,
    deliveryProcessNotification,
    deliveryFinishNotification,
    allPersonalLister,
    tokenDeviceFinder
  ) {
    return this.repository.add(
      state,
      idDelivery,
      deliveryCancelNotification,
      deliveryProcessNotification,
      deliveryFinishNotification,
      allPersonalLister,
      tokenDeviceFinder
    );
  }
}

module.exports = DeliveryStateChanger;
