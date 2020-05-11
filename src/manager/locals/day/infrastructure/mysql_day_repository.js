const db = require("../../../../shared/domain/db");
const Day = require("../domain/day");
const RawString = require("../../../../shared/domain/value/raw_string");
class MySqlDayRepository {
  async list(idLocal) {
    const data = await db.doQuery(
      `SELECT id_day as idDay, opening, closing 
      FROM schedule 
      INNER JOIN day ON day.id_schedule = schedule.id_schedule 
      WHERE schedule.id_local=? AND schedule.state = 1;`,
      idLocal.value
    );

    return data.map(
      (day) =>
        new Day(
          new RawString(day.idDay),
          new RawString(day.opening),
          new RawString(day.closing)
        )
    );
  }
  async update(idSchedule, day) {
    await db.doQuery(
      `UPDATE day SET ?
       WHERE id_day = ? AND id_schedule = ?`,
      [
        {
          opening: day.opening.value,
          closing: day.closing.value,
          modified_at: new Date().toLocaleString(),
        },
        day.idDay.value,
        idSchedule.value,
      ]
    );
  }
}

module.exports = MySqlDayRepository;
