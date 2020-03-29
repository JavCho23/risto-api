const Meal = require("../../../domain/meal");
const MealId = require("../../../domain/value/meal_id");
const MealName = require("../../../domain/value/meal_name");
const LocalName = require("../../../../../shared/domain/local/value/local_name");
const MealPrice = require("../../../domain/value/meal_price");
const MealImage = require("../../../domain/value/meal_image");
const MealDescription = require("../../../domain/value/meal_description");
const MealFavorite = require("../../../domain/value/meal_favorite");

const GetScore = require("../../../aplication/get_score/get_score");

class FillCompleteMeal {
    constructor(dataMeal, tagGetCatagory, tagListIngredients) {
        this._dataMeal = dataMeal;
        this._tagGetCategory = tagGetCatagory;
        this._tagListIngredients = tagListIngredients;
        this._mealId = new MealId(this._dataMeal.id_meal);
    }
    async call() {
        await this.getValues();
        return new Meal(
            this._mealId,
            new MealName(this._dataMeal.name),
            new LocalName(this._dataMeal.localName),
            new MealPrice(this._dataMeal.price),
            new MealImage(this._dataMeal.image),
            new MealDescription(this._dataMeal.description),
            this._category[0],
            this._score,
            new MealFavorite(false),
            this._ingredients
        );
    }
    async getValues() {
        const getScore = new GetScore(this._mealId);
        this._score = getScore.call();
        this._ingredients = await this._tagListIngredients.call(this._mealId);
        this._category = await this._tagGetCategory.call(this._mealId);
    }

}

module.exports = FillCompleteMeal;
