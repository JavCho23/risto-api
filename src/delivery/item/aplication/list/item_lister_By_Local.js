class ItemListerByLocal {
    constructor(repository) {
        this.repository = repository;
    }
    call(idLocal, limit, offset, productLister, tagLister) {
        return this.repository.listByLocal(
            idLocal,
            limit,
            offset,
            productLister,
            tagLister
        );
    }
}

module.exports = ItemListerByLocal;
