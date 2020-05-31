const Order = require("../../domain/order");
class OrderAdder {
    constructor(repository) {
        this.repository = repository;
    }
    call(idDelivery, order) {
        return this.repository.add(idDelivery, order);
    }
}

module.exports = OrderAdder;
