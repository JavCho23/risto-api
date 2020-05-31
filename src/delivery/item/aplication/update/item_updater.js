const Item = require("../../domain/item");

class ItemUpdater {
    constructor(repository) {
        this.repository = repository;
    }
    call(
        item,
        productLister,
        tagLister,
        productUpdater,
        productAdder,
        productRemover,
        recordAdder
    ) {
        return this.repository.update(
            Item.fromJson(item),
            productLister,
            tagLister,
            productUpdater,
            productAdder,
            productRemover,
            recordAdder
        );
    }
}

module.exports = ItemUpdater;
