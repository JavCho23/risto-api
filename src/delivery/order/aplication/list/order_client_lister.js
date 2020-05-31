class OrderClientLister {
    constructor(repository) {
        this.repository = repository;
    }
    call(idDelivery,idUser) {
        return this.repository.listClient(idDelivery,idUser);
    }
}

module.exports = OrderClientLister;
