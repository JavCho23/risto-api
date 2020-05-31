class DeliveryListerByLocal {
    constructor(repository) {
        this.repository = repository;
    }
    call(idLocal, locationFinder, paymentFinder, orderLister, type, days) {
        if (type == "active")
            return this.repository.listByLocalActive(
                idLocal,
                locationFinder,
                paymentFinder,
                orderLister,
                days
            );
        return this.repository.listByLocalHistory(
            idLocal,
            locationFinder,
            paymentFinder,
            orderLister,
            days
        );
    }
}

module.exports = DeliveryListerByLocal;
