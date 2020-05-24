class DeliveryAdder {
  constructor(repository) {
    this.repository = repository;
  }
  call(
    idDelivery,
    idLocal,
    idUser,
    idPayment,
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
      idUser,
      idPayment,
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

