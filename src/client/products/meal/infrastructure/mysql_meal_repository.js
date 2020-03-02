const db = require("../../../../shared/domain/db");
const MealNotExist = require("../domain/meal_not_exist");
const FillCompleteMeal = require("../aplication/fill/complete/fill_complete_meal");
const FillFeedMeal = require("../aplication/fill/feed/fill_feed_meal");
class MySqlMealRepository {
  async find(itemId, state) {
    const data = await db.doQuery(
      "SELECT id_meal, meal.name as name, local.name as localName,price,image, meal.description FROM meal INNER JOIN menu ON menu.id_menu = meal.id_menu INNER JOIN local ON local.id_local = menu.id_local WHERE meal.id_meal = ? AND meal.state = ?",
      [itemId.value, state.value]
    );
    if (data.length == 0) throw new MealNotExist();
    const fillCompleteMeal = new FillCompleteMeal(data[0]);

    return await fillCompleteMeal.call();
  }
  async listFeed(state) {
    const data = await db.doQuery(
      "SELECT id_meal, meal.name as name, local.name as localName ,price ,image FROM meal INNER JOIN menu ON menu.id_menu = meal.id_menu INNER JOIN local ON local.id_local = menu.id_local WHERE meal.state = ?",
      state.value
    );
    if (data.length == 0) throw new MealNotExist();
    const meals = await Promise.all(
      data.map(async meal => {
        const fillFeedMeal = new FillFeedMeal(meal);
        return await fillFeedMeal.call();
      })
    );
    return meals;
  }
}

module.exports = MySqlMealRepository;
