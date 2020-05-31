class ItemFinder {
    constructor(repository) {
        this.repository = repository;
    }
    call(idLocal, productLister, tagLister) {
        return this.repository.find(idLocal, productLister, tagLister);
    }
}

module.exports = ItemFinder;
