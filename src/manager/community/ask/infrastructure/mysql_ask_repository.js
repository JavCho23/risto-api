const db = require("../../../../shared/domain/db");
const Ask = require("../domain/ask");

class MySqlAskRepository {
    async list(localId) {
        const data = await db.doQuery(
            "SELECT id_ask as id, text, created_at as date, modified_at FROM ask WHERE id_local = ?",
            localId
        );
        //if (data.length == 0) throw new MealNotExist();

        return data.map((ask)=> new Ask(ask.id,ask.text,ask.date));
    }
}

module.exports = MySqlAskRepository;
