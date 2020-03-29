const MealScore = require("../../domain/value/meal_score");
class GetScore {
    constructor(mealId) {
        this._mealId = mealId;
    }
    call() {
        return new MealScore(Math.random() * (5 + 0) + 0);
    }
}

module.exports = GetScore;
