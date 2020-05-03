class ItemListFeed {
    constructor(repository) {
        this.repository = repository;
    }
    call(state) {
        return this.repository.listFeed(state);
    }
}

module.exports = ItemListFeed;
