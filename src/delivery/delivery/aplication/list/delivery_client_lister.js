class DeliveryListerByClient {
    constructor(repository) {
        this.repository = repository;
    }
    call(idUser, locationFinder, paymentFinder, orderLister) {
        return this.repository.listByUser(
            idUser,
            locationFinder,
            paymentFinder,
            orderLister
        );
    }
}

module.exports = DeliveryListerByClient;
