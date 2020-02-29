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
const GetScore = require("../aplication/get_score/get_score");
class MySqlMealRepository {
  async find(itemId, state) {
    const data = await db.doQuery(
      "SELECT id_meal, meal.name as name, local.name as localName,price,image, meal.description FROM meal INNER JOIN menu ON menu.id_menu = meal.id_menu INNER JOIN local ON local.id_local = menu.id_local WHERE meal.id_meal = ? AND meal.state = ?",
      [itemId.value, state.value]
    );
    if (data.length == 0) throw new MealNotExist();
    const tagGetCatagory = new TagGetCatagory(new MySqlTagRepository());
    const meal = data[0];
    const mealId = new MealId(meal.id_meal);
    const getScore = new GetScore(mealId);
    const score = getScore.call();
    const ingredients = await tagGetCatagory.call(mealId);
    const category = await tagGetCatagory.call(mealId);
    const result = new Meal(
      mealId,
      new MealName(meal.name),
      new LocalName(meal.localName),
      new MealPrice(meal.price),
      new MealImage(meal.image),
      new MealDescription(meal.description),
      category[0],
      score,
      new MealFavorite(false)
    );
    result.ingredients = ingredients;
    return result;
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
        const mealId = new MealId(meal.id_meal);
        const getScore = new GetScore(mealId);
        const score = getScore.call();
        const category = await tagGetCatagory.call(mealId);
        return new Meal(
          mealId,
          new MealName(meal.name),
          new LocalName(meal.localName),
          new MealPrice(meal.price),
          new MealImage(meal.image),
          new MealDescription(meal.description),
          category[0],
          score,
          new MealFavorite(false)
        );
      })
    );
    return meals;
  }
}

module.exports = MySqlMealRepository;
