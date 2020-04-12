const Utils = require("../../../shared/utils.js");
class Comment {
  constructor(id_qualification, name, scores, text) {
    this._id = id_qualification;
    this._personName = name;
    this._scores = scores;
    this._ranking = Utils.calculateRanting(scores);
    this._text = text == null ? text : "";
  }

  toJson() {
    return {
      id: this._id.value,
      personName: this._personName.value,
      scores: this._scores.map((score) => {
        return score.toJson();
      }),
      ranking: this._ranking,
      text: this._text.value,
    };
  }

  get scores() {
    return this._scores;
  }
}

module.exports = Comment;
