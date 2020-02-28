const db = require("../../../../shared/domain/db");
const Meal = require("../domain/meal");
const MealId = require("../domain/value/meal_id");
const MealName = require("../domain/value/meal_name");
const LocalName = require("../../shared/domain/value/local_name");
const MealPrice = require("../domain/value/meal_price");
const MealImage = require("../domain/value/meal_image");
const MealDescription = require("../domain/value/meal_description");
const MealNotExist = require("../domain/meal_not_exist");

class MySqlMealRepository {
  async find(itemId, state) {
    const data = await db.doQuery(
      "SELECT id_meal, meal.name as name, local.name as localName,price,image FROM meal INNER JOIN menu ON menu.id_menu = meal.id_menu INNER JOIN local ON local.id_local = menu.id_local WHERE id_item = ? AND meal.state = ?",
      [itemId.value, state.value]
    );
    if (data.length == 0) throw new MealNotExist();
    return new Meal(
      new MealId(data[0].id_meal),
      new MealName(data[0].name),
      new LocalName(data[0].localName),
      new MealPrice(data[0].price),
      new MealImage(data[0].image),
      new MealDescription(data[0].description)
    );
  }
  async listFeed(state) {
    const data = await db.doQuery(
      "SELECT id_meal, meal.name as name, local.name as localName ,price ,image FROM meal INNER JOIN menu ON menu.id_menu = meal.id_menu INNER JOIN local ON local.id_local = menu.id_local WHERE meal.state = ?",
      state.value
    );
    const meals = data.map(
      meal =>
        new Meal(
          new MealId(item.id_meal),
          new MealName(item.name),
          new LocalName(item.localName),
          new MealPrice(item.price),
          new MealImage(item.image),
          new MealDescription(item.description)
        )
    );
    return meals;
  }
}

module.exports = MySqlMealRepository;
