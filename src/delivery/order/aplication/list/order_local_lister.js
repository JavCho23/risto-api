class OrderLocalLister {
    constructor(repository) {
        this.repository = repository;
    }
    call(idDelivery) {
        return this.repository.listLocal(idDelivery);
    }
}

module.exports = OrderLocalLister;
