class ItemChangerAvialable {
    constructor(repository) {
        this.repository = repository;
    }
    call(idItem) {
        return this.repository.changeItemAvialable(idItem);
    }
}

module.exports = ItemChangerAvialable;
