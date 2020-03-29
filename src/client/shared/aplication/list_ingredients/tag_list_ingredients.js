class ListIngredients {
    constructor(repository) {
        this.repository = repository;
    }
    call(id_meal) {
        return this.repository.listTag(
            id_meal,
            "24a0c163-2834-4a4b-9327-cfe1ca6522e3"
        );
    }
}

module.exports = ListIngredients;
