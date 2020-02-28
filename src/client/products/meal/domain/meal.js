const MealId = require("./value/meal_id");
const MealName = require("./value/meal_name");
const MealPrice = require("./value/meal_price");
const MealImage = require("./value/meal_image");
const MealDescription = require("./value/meal_description");
const MenuName = require("../../shared/domain/value/local_name");

class Meal {
  constructor(id_meal, name, local, price, image, description) {
    this._id = id_meal;
    this._name = name;
    this._local = local;
    this._price = price;
    this._image = image;
    this._description = description;
  }

  toJson() {
    return {
      id: this._id.value,
      name: this._name.value,
      local: this._local.value,
      price: this._price.value,
      image: this._image.value,
      description: this._description.value
    };
  }
}

module.exports = Meal;
