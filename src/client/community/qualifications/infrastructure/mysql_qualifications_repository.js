const CommentList = require("../../comment/aplication/comment_list");
const MySqlCommentRepository = require("../../comment/infrastructure/mysql_comment_repository");
const SummaryGet = require("../../summary/aplication/summary_get");
const MySqlSummaryRepository = require("../../summary/infrastructure/mysql_summary_repository");
const Qualifications = require("../domain/qualifications");
class MySqlQualificationsRepository {

    async list(mealId) {

        const commentList = new CommentList(
            new MySqlCommentRepository()
        );
        const comments   = await commentList.call(mealId);
        
        const summaryGet = new SummaryGet(new MySqlSummaryRepository());
        const summary    = await summaryGet.call(mealId,comments);
        

        return new Qualifications(summary,comments);
    }
}

module.exports = MySqlQualificationsRepository;
