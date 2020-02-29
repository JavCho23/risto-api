const db = require("../../../../shared/domain/db");
const Meal = require("../domain/meal");
const MealId = require("../domain/value/meal_id");
const MealName = require("../domain/value/meal_name");
const LocalName = require("../../../shared/domain/local/value/local_name");
const MealPrice = require("../domain/value/meal_price");
const MealImage = require("../domain/value/meal_image");
const MealDescription = require("../domain/value/meal_description");
const MealFavorite = require("../domain/value/meal_favorite");
const MealNotExist = require("../domain/meal_not_exist");
const MySqlTagRepository = require("../../../shared/infrastructure/mysql_tag_repository");
const TagGetCatagory = require("../../../shared/aplication/get_category/tag_get_category");
const TagName = require("../../../shared/domain/tag/value/tag_name");
const TagId = require("../../../shared/domain/tag/value/tag_id");
const Tag = require("../../../shared/domain/tag/tag");
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
    if (data.length == 0) throw new MealNotExist();
    const tagGetCatagory = new TagGetCatagory(new MySqlTagRepository());

    const meals = await Promise.all(
      data.map(async meal => {
        let mealId = new MealId(meal.id_meal);
        let category = await tagGetCatagory.call(mealId);
        return new Meal(
          mealId,
          new MealName(meal.name),
          new LocalName(meal.localName),
          new MealPrice(meal.price),
          new MealImage(meal.image),
          new MealDescription(meal.description),
          category[0],
          new MealFavorite(false)
        );
      })
    );
    return meals;
  }
}

module.exports = MySqlMealRepository;
