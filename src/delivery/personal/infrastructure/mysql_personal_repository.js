const db = require("../../../shared/domain/db");
const Personal = require("../domain/personal");
const RawString = require("../../../shared/domain/value/raw_string");
const Uuid = require("../../../shared/domain/value/uuid");

class MySqlPersonalRepository {
  async list(idLocal) {
    const data = await db.doQuery(
      `SELECT manager.id_manager as idManager, CONCAT(person.name, person.lastname) as name, user.email
      FROM manager
      INNER JOIN person ON person.id_manager = manager.id_manager
      INNER JOIN user ON user.id_user = person.id_user
      WHERE manager.state = 1 AND manager.id_local = "5449699c-d70c-44d9-a83a-0f8d220ee207"`,
      idLocal.value
    );
    return data.map(
      (personal) =>
        new Personal(
          new Uuid(personal.idPersonal),
          new RawString(personal.name),
          new PersonalNumber(personal.email)
        )
    );
  }
  async remove(idPersonal) {
    await db.doQuery(
      `UPDATE manager SET state = 0
      WHERE id_Manager = ?`,
      idPersonal.value
    );
  }
  async add(idLocal, idPersonal, idUser) {
    
    await db.doQuery(`INSERT INTO manager SET ?`, {
      id_manager: idPersonal.value,
      id_local: idLocal.value,
    });
    await db.doQuery(
      "UPDATE person SET id_manager = ?, modified_at = NOW() WHERE id_user = ?",[
        idPersonal.value, idUser.value
      ]
    );
  }
}

module.exports = MySqlPersonalRepository;
