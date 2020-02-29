const MealId = require("./value/meal_id");
const MealName = require("./value/meal_name");
const MealPrice = require("./value/meal_price");
const MealImage = require("./value/meal_image");
const MealDescription = require("./value/meal_description");
const LocalName = require("../../../shared/domain/local/value/local_name");

class Meal {
  constructor(
    id_meal,
    name,
    local,
    price,
    image,
    description,
    category,
    favourite
  ) {
    this._id = id_meal;
    this._name = name;
    this._local = local;
    this._price = price;
    this._image = image;
    this._description = description;
    this._category = category;
    this._favorite = favourite;
  }
  /**
   * @param {Tag} ingredients
   */
  set ingredients(ingredients) {
    this._ingredients = ingredients;
  }
  toJsonFeed() {
    return {
      id: this._id.value,
      name: this._name.value,
      image: this._image.value,
      local: this._local.value,
      price: this._price.value,
      //score: this._score.value,
      category: this._category.value,
      isfavourite: this._favorite.value
    };
  }
}

module.exports = Meal;
