const db = require("../../../../shared/domain/db");
const Schedule = require("../domain/schedule");
const RawString = require("../../../../shared/domain/value/raw_string");

class MySqlScheduleRepository {
  async list(idLocal) {
    const data = await db.doQuery(
      `SELECT id_day as idDay, opening, closing 
      FROM schedule 
      INNER JOIN day ON day.id_schedule = schedule.id_schedule 
      WHERE schedule.id_local=? AND schedule.state = 1;`,
      idLocal.value
    );

    return data.map(
      (schedule) =>
        new Schedule(
          new RawString(schedule.day),
          new RawString(schedule.opening),
          new RawString(schedule.closing)
        )
    );
  }
}

module.exports = MySqlScheduleRepository;
