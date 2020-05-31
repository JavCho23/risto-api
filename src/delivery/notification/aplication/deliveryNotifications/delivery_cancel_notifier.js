class DeliveryCancelNotifier {
    constructor(repository) {
        this.repository = repository;
    }
    call(idLocal, idDelivery, state, allPersonalLister, tokenDeviceFinder) {
        return this.repository.deliveryCancelNotification(
            idLocal,
            idUser,
            idDelivery,
            state,
            allPersonalLister,
            tokenDeviceFinder
        );
    }
}

module.exports = DeliveryCancelNotifier;
