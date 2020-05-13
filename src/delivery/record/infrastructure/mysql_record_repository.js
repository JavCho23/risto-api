const db = require("../../../shared/domain/db");
const Record = require("../domain/record");
const RawString = require("../../../shared/domain/value/raw_string");
const Uuid = require("../../../shared/domain/value/uuid");

class MySqlRecordRepository {
  async list(idLocal, days) {
    const data = await db.doQuery(
      `SELECT record.id_record as idRecord, person.name,  record.description, record.created_at as date from record 
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
}

module.exports = MySqlRecordRepository;
