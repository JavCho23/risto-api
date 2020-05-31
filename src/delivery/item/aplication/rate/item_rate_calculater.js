class ItemRateCalculater {
    constructor(repository) {
        this.repository = repository;
    }
    call(idItem) {
        return this.repository.calculateRate(idItem);
    }
}

module.exports = ItemRateCalculater;
