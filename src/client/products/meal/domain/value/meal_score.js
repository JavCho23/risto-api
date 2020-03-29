const RawDouble = require("../../../../../shared/domain/value/raw_double");

class MealScore extends RawDouble {
    constructor(value) {
        super(parseFloat(value.toFixed(1)));
    }
}

module.exports = MealScore;
