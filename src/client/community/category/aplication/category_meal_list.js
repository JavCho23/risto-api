class CategoryListMeal {
    constructor(repository) {
        this.repository = repository;
    }
    call(mealId) {
        return this.repository.listCategoriesMeal(mealId);
    }
}

module.exports = CategoryListMeal;
