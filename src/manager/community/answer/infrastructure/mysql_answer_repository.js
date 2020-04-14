const db = require("../../../../shared/domain/db");
const Answer = require("../domain/answer");
const RegisterError = require("../../../../shared/domain/error/register_error");

class MySqlUserRepository {
    async register(dataAnswer) {
        const answer = new Answer(
            dataAnswer.askId,
            dataAnswer.managerId,
            dataAnswer.text
        );
        const result = await db.doQuery("INSERT INTO answer SET ?", answer.toJson());
        if(result) return true; 
        throw new RegisterError();
    }
    async list(askId) {
        const data = await db.doQuery(
            "SELECT id_ask as askId, id_manager managerId, text, modified_at as date FROM answer WHERE id_ask = ? ",
            askId
        );
        return data.map(
            (answer) => new Answer(answer.askId, answer.managerId, answer.text)
        );
    }
}

module.exports = MySqlUserRepository;
