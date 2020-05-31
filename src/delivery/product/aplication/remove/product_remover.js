class ProductRemover {
    constructor(repository) {
        this.repository = repository;
    }
    call(idProduct) {
        return this.repository.remove(idProduct);
    }
}

module.exports = ProductRemover;
