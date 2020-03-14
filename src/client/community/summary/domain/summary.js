
const Score = require("../../score/domain/score");
const ScoreName = require("../../score/domain/value/score_name");
const ScoreAmount = require("../../score/domain/value/score_amount");
const Utils = require("../../shared/utils");
class Summary{
    constructor(categories,comments){
        this._scores = [];
        this.calculateScores(categories,comments);
        this._total = Utils.calculateRanting(this._scores);
    }

    calculateScores(categories,comments){

        categories.forEach(category => {
            let amountTotal = 0;
            comments.forEach(comment => {
                comment.scores.forEach(score => {
                    if(score.category.value == category.name.value){
                        amountTotal+= score.amount.value;
                    }
                });
            });

            this._scores.push(new Score(new ScoreName(category.name.value),new ScoreAmount(amountTotal/category.total.value)));
        });

    }

    toJson(){
        return {
            total: this._total,
            scores: this._scores.map(score => score.toJson())
        };
    }
}

module.exports = Summary;