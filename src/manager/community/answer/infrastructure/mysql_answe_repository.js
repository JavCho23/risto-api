const db = require("../../../../shared/domain/db");
const Answer = require("../domain/answer")
class MySqlUserRepository {
    async register(dataAnswer) {
        try {
            const answer = new Answer(dataAnswer.askId,dataAnswer.managerId,dataAnswer.text);
            const data = await db.doQuery(
                "INSERT INTO answer SET ?",
                answer.toJson()
            );
            return true;
        } catch (err) {
            return false;
        }
    }
}

module.exports = MySqlUserRepository;
