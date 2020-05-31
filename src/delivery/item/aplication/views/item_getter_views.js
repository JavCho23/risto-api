class ItemGetterViews {
    constructor(repository) {
        this.repository = repository;
    }
    call(idItem) {
        return this.repository.getViews(idItem);
    }
}

module.exports = ItemGetterViews;
