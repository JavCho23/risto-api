class ItemRemover {
    constructor(repository) {
        this.repository = repository;
    }
    call(idItem, recordAdder) {
        return this.repository.remove(idItem, recordAdder);
    }
}

module.exports = ItemRemover;
