const Utils = require("../../../../shared/utils");
class Comment {
  constructor(id_qualification, scores) {
    this._id = id_qualification;
    this._scores = scores;
    this._ranking = Utils.calculateRanting(scores);
  }

  get scores() {
    return this._scores;
  }
}

module.exports = Comment;
