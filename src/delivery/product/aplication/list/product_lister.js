class ProductLister {
    constructor(repository) {
        this.repository = repository;
    }
    call(idItem) {
        return this.repository.list(idItem);
    }
}

module.exports = ProductLister;
