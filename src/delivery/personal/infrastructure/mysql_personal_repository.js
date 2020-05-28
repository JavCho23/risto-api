const db = require("../../../shared/domain/db");
const Personal = require("../domain/personal");
const RawString = require("../../../shared/domain/value/raw_string");
const Uuid = require("../../../shared/domain/value/uuid");

class MySqlPersonalRepository {
  async list(idLocal) {
    const data = await db.doQuery(
      `SELECT manager.id_manager as id, person.name,user.email, user.id_user as idUser
      FROM manager
      INNER JOIN person ON person.id_manager = manager.id_manager
      INNER JOIN user ON user.id_user = person.id_user
      WHERE manager.state = 1 AND manager.id_local = ?`,
      idLocal.value
    );
    return data.map(
      (personal) =>
        new Personal(
          new Uuid(personal.idPersonal),
          new RawString(personal.name),
          new RawString(personal.email),
          new Uuid(personal.idUser)
        )
    );
  }
  async listAllPersonal(idLocal) {
    const data = await db.doQuery(
      `SELECT manager.id_manager as id, person.name,user.email, user.id_user as idUser
      FROM manager
      INNER JOIN person ON person.id_manager = manager.id_manager
      INNER JOIN user ON user.id_user = person.id_user
      WHERE manager.state = 1 AND manager.id_local = ?
      UNION
      SELECT admin.id_admin as id, person.name , user.email , user.id_user as idUser
      FROM admin 
      INNER JOIN person ON person.id_admin = admin.id_admin
      INNER JOIN signature ON admin.id_admin = signature.id_admin
      INNER JOIN local ON local.id_signature = signature.id_signature
      INNER JOIN user ON user.id_user = person.id_user
      WHERE admin.state = 1 AND local.id_local = ?`,
      [idLocal.value, idLocal.value]
    );
    return data.map(
      (personal) =>
        new Personal(
          new Uuid(personal.id),
          new RawString(personal.name),
          new RawString(personal.email),
          new Uuid(personal.idUser)
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
      "UPDATE person SET id_manager = ?, modified_at = NOW() WHERE id_user = ?",
      [idPersonal.value, idUser.value]
    );
  }
}

module.exports = MySqlPersonalRepository;
