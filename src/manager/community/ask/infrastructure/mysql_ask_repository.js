const db = require("../../../../shared/domain/db");
const Ask = require("../domain/ask");
const AnswerLister = require("../../answer/aplication/list/answer_lister");
const MySqlAnswerRepository = require("../../answer/infrastructure/mysql_answer_repository");

class MySqlAskRepository {
    async list(localId) {
        const data = await db.doQuery(
            "SELECT id_ask as id, text, created_at as date, modified_at FROM ask WHERE id_local = ?",
            localId
        );
        //if (data.length == 0) throw new MealNotExist();
        const answerLister = new AnswerLister(new MySqlAnswerRepository());
        return await Promise.all(data.map( async (ask)=> { 
            const answers = await answerLister.call(ask.id);
            return new Ask(ask.id,ask.text,ask.date, answers);
        }));
    }
}

module.exports = MySqlAskRepository;
