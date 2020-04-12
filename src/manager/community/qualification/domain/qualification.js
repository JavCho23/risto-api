
const Score = require("../../score/domain/score");
const ScoreName = require("../../score/domain/value/score_name");
const ScoreAmount = require("../../score/domain/value/score_amount");
const Utils = require("../../../shared/utils.js");
class Qualification{
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
                    if(score.category == category.name){
                        amountTotal+= score.amount;
                    }
                });
            });

            this._scores.push(new Score(new ScoreName(category.name),new ScoreAmount(amountTotal/category.total)));
        });

    }

    toJson(){
        return {
            score: this._total,
        };
    }
    get score(){
        return this._total;
    }
}

module.exports = Qualification;