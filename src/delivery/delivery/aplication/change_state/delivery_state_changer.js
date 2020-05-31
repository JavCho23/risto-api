class DeliveryStateChanger {
    constructor(repository) {
        this.repository = repository;
    }
    call(
        state,
        idDelivery,
        deliveryCancelNotification,
        deliveryProcessNotification,
        deliveryFinishNotification,
        allPersonalLister,
        tokenDeviceFinder,
        recordAdder
    ) {
        return this.repository.changeState(
            state,
            idDelivery,
            deliveryCancelNotification,
            deliveryProcessNotification,
            deliveryFinishNotification,
            allPersonalLister,
            tokenDeviceFinder,
            recordAdder
        );
    }
}

module.exports = DeliveryStateChanger;
