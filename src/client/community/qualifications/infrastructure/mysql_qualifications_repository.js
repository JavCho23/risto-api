const QualificationList = require("../../qualification/aplication/qualification_list");
const MySqlQualificationRepository = require("../../qualification/infrastructure/mysql_qualification_repository");
const SummaryGet = require("../../summary/aplication/qualifications_list");
const MySqlSummaryRepository = require("../../summary/infrastructure/mysql_summary_repository");
const Qualifications = require("../domain/qualifications");
class MySqlQualificationsRepository {

    async list(mealId) {

        const qualificationList = new QualificationList(
            new MySqlQualificationRepository()
        );
        const comments   = await qualificationList.call(mealId);
        
        const summaryGet = new SummaryGet(new MySqlSummaryRepository());
        const summary    = await summaryGet.call(mealId,comments);
        

        return new Qualifications(summary,comments);
    }
}

module.exports = MySqlQualificationsRepository;
