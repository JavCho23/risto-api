class DeliveryAdder {
  constructor(repository) {
    this.repository = repository;
  }
  call(
    idDelivery,
    idLocal,
    idProfile,
    idPayment,
    comment,
    price,
    total,
    orders,
    orderAdder,
    deliveryCreatedNotification,
    allPersonalLister,
    tokenDeviceFinder
  ) {
    return this.repository.add(
      idDelivery,
      idLocal,
      idProfile,
      idPayment,
      comment,
      price,
      total,
      orders,
      orderAdder,
      deliveryCreatedNotification,
      allPersonalLister,
      tokenDeviceFinder
    );
  }
}

module.exports = DeliveryAdder;
