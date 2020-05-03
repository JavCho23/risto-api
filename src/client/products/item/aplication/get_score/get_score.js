const ItemScore = require("../../domain/value/item_score");
class GetScore {
    constructor(itemId) {
        this._itemId = itemId;
    }
    call() {
        return new ItemScore(Math.random() * (5 + 0) + 0);
    }
}

module.exports = GetScore;
