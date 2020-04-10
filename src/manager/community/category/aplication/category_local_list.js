class CategoryLocalList {
    constructor(repository) {
        this.repository = repository;
    }
    call(localId) {
        return this.repository.listLocalCategories(localId);
    }
}

module.exports = CategoryLocalList;
