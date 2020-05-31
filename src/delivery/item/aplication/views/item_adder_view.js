class ItemViewer {
    constructor(repository) {
        this.repository = repository;
    }
    call(idItem) {
        return this.repository.addOneView(idItem);
    }
}

module.exports = ItemViewer;
