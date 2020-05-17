class DeliveryAdder {
  constructor(repository) {
    this.repository = repository;
  }
  call(idDelivery, idLocal, idUser, idPayment, price, orders, orderAdder) {
    return this.repository.add(
      idDelivery,
      idLocal,
      idUser,
      idPayment,
      price,
      orders,
      orderAdder
    );
  }
}

module.exports = DeliveryAdder;
