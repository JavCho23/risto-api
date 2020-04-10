const db = require("../../../../shared/domain/db");
const Comment = require("../domain/comment");
const CommentId = require("../domain/value/comment_id");
const ScoreList = require("../../score/aplication/score_list");
const MysqlScoreRepository = require("../../score/infrastructure/mysql_score_repository");

class MySqlQualificationRepository {

    async list(localId) {
        const data = await db.doQuery(
            `SELECT qualification.id_qualification as id, person.name, comentary.text as text 
            FROM qualification 
            WHERE id_local = ? AND qualification.state = 1`,
            localId
        );
        const scoreList  =  new ScoreList(new MysqlScoreRepository());
        const qualifications = await Promise.all(data.map(async qualification => {

            const scores = await scoreList.call(new QualificationId(qualification.id));

            return new Comment(qualification.id,scores);
            
        }));
        
        return qualifications;
    }
}

module.exports = MySqlQualificationRepository;
