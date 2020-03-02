const Meal = require("../../../domain/meal");
const MealId = require("../../../domain/value/meal_id");
const MealName = require("../../../domain/value/meal_name");
const LocalName = require("../../../../../shared/domain/local/value/local_name");
const MealPrice = require("../../../domain/value/meal_price");
const MealImage = require("../../../domain/value/meal_image");
const MealFavorite = require("../../../domain/value/meal_favorite");
const MySqlTagRepository = require("../../../../../shared/infrastructure/mysql_tag_repository");
const TagGetCatagory = require("../../../../../shared/aplication/get_category/tag_get_category");
const GetScore = require("../../../aplication/get_score/get_score");

class FillFeedMeal {
    constructor(dataMeal) {
        this._dataMeal = dataMeal;
    }
    async call() {
        await this.getValues();
        return new Meal(
            this._mealId,
            new MealName(this._dataMeal.name),
            new LocalName(this._dataMeal.localName),
            new MealPrice(this._dataMeal.price),
            new MealImage(this._dataMeal.image),
            null,
            this._category[0],
            this._score,
            new MealFavorite(false),
            null
        );
    }
    async getValues() {

        const tagGetCatagory = new TagGetCatagory(new MySqlTagRepository());
        this._mealId = new MealId(this._dataMeal.id_meal);
        const getScore = new GetScore(this._mealId);
        this._score = getScore.call();
        this._category = await tagGetCatagory.call(this._mealId);
    }

}

module.exports = FillFeedMeal;
