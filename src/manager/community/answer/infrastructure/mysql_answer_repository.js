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
    async list(askId) {
            const data = await db.doQuery(
                "SELECT id_ask as askId, id_manager managerId, text, modified_at as date FROM answer WHERE id_ask = ? ",
                askId
                );
            return data.map(answer => new Answer(answer.askId, answer.managerId,answer.text));
       
    }
}

module.exports = MySqlUserRepository;
