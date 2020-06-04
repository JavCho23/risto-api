class OrderLister {
    constructor(repository) {
        this.repository = repository;
    }
    call(idDelivery) {
        return this.repository.list(idDelivery);
    }
}

module.exports = OrderLister;
