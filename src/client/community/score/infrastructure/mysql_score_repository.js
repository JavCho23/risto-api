const db = require("../../../../shared/domain/db");
const Score = require("../domain/score");
const ScoreName = require("../domain/value/score_name");
const ScoreAmount = require("../domain/value/score_amount");
class MySqlScoreRepository {

    async list(idQualification) {
        const data = await db.doQuery(
            "SELECT tag.name , score.amount FROM qualification INNER JOIN score ON score.id_qualification = qualification.id_qualification INNER JOIN tag on score.id_tag = tag.id_tag WHERE qualification.id_qualification = ? AND qualification.state = 1",
            idQualification.value
        );
        if (data.length == 0) ;
        
        const scores = [];
        
        data.forEach(score => {
            scores.push(new Score( new ScoreName(score.name), new ScoreAmount(score.amount)));
        });
        
        return scores;
    }
}

module.exports = MySqlScoreRepository;
