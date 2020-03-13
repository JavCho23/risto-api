const db = require("../../../../shared/domain/db");
const Qualification = require("../domain/qualification");
const QualificationId = require("../domain/value/qualification_id");
const PersonName = require("../../../shared/domain/person/person_name");
const ScoreList = require("../../score/aplication/score_list");
const MysqlScoreRepository = require("../../score/infrastructure/mysql_score_repository");

class MySqlQualificationRepository {

    async list(mealId) {
        const data = await db.doQuery(
            "SELECT id_qualification as id, person.name FROM qualification INNER JOIN customer ON  qualification.id_customer = customer.id_customer INNER JOIN person on customer.id_customer = person.id_customer WHERE id_item = ? AND qualification.state = 1",
            mealId.value
        );
        if (data.length == 0) ;
        
        

        const scoreList  =  new ScoreList(new MysqlScoreRepository());
        const qualifications = await Promise.all(data.map(async qualification => {

            const scores = await scoreList.call(new QualificationId(qualification.id));

            return new Qualification(new QualificationId(qualification.id), new PersonName(qualification.name),scores);
            
        }));
        
        return qualifications;
    }
}

module.exports = MySqlQualificationRepository;
