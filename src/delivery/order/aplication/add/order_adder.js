const Order = require("../../domain/order");
class OrderAdder {
  constructor(repository) {
    this.repository = repository;
  }
  call(idDelivery, order) {
    return this.repository.add(idDelivery, Order.fromJson(order));
  }
}

module.exports = OrderAdder;
