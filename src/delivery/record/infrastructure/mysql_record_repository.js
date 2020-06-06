const db = require("../../../shared/domain/db");
const Record = require("../domain/record");
const RawString = require("../../../shared/domain/value/raw_string");
const Uuid = require("../../../shared/domain/value/uuid");
const { v4: uuidv4 } = require("uuid");
class MySqlRecordRepository {
    async list(idLocal, days) {
        const data = await db.doQuery(
            `SELECT record.id_record as idRecord, person.name,  record.description, DATE_SUB(record.created_at, INTERVAL 5 HOUR) as date from record 
      INNER JOIN manager ON manager.id_manager = record.id_manager 
      INNER JOIN person ON person.id_manager = manager.id_manager
      WHERE manager.id_local = ? AND manager.state = 1 AND record.created_at >= DATE_ADD(record.created_at, INTERVAL -? DAY);`,
            [idLocal.value, days.value]
        );
        return data.map(
            (record) =>
                new Record(
                    new Uuid(record.idRecord),
                    new RawString(record.name),
                    new RawString(record.description),
                    new RawString(record.date)
                )
        );
    }
    async add(idUser, description, idLocal) {
        let data;
        if (idLocal) {
            data = await db.doQuery(
                `SELECT person.id_manager as idManager FROM user 
        INNER JOIN person ON person.id_user = user.id_user 
        INNER JOIN manager ON manager.id_manager = person.id_manager
        WHERE user.id_user = ? AND manager.id_local = ?`,
                [idUser.value, idLocal.value]
            );
        } else {
            data = await db.doQuery(
                "SELECT id_manager as idManager FROM user INNER JOIN person ON person.id_user = user.id_user WHERE user.id_user = ?",
                idUser.value
            );
        }
        if (data.length == 0) return;
        await db.doQuery("INSERT INTO record SET ?", {
            id_record: uuidv4(),
            id_manager: data[0].idManager,
            description: description,
        });
    }
}

module.exports = MySqlRecordRepository;
