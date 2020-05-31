class SearchResult {
    constructor(id, score, type) {
        this._id = id;
        this._score = score;
        this._type = type;
    }
    get id() {
        return this._id;
    }
    get score() {
        return this._score;
    }
    toJson() {
        return {
            score: this._score.value,
            type: this._type,
            ...this._result.toJson(),
        };
    }
}

module.exports = SearchResult;
