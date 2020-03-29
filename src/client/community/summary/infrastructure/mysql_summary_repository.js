const CategoryListMeal = require("../../category/aplication/category_meal_list");
const MysqlCategoryRepository = require("../../category/infrastructure/mysql_category_repository");
const Summary = require("../domain/summary");

class MySqlSummaryRepository {

    async get(mealId,comments) {

        const categoryListMeal = new CategoryListMeal(new MysqlCategoryRepository());
        
        const categories =  await categoryListMeal.call(mealId);

        return new Summary(categories,comments);
    }
}

module.exports = MySqlSummaryRepository;
