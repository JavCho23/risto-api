const db = require("../../../shared/domain/db");
const { v4: uuidv4 } = require("uuid");

class MySqlUserRepository {
  async register(user) {
    const idCustomer = uuidv4();
    await db.doQuery("INSERT INTO user SET ?", {
      id_user: user.idUser.value,
      email: user.email.value,
      device_token: user.deviceToken.value,
    });
    await db.doQuery("INSERT INTO customer SET ?", { id_customer: idCustomer });
    await db.doQuery("INSERT INTO person SET ?", {
      id_person: uuidv4(),
      id_user: user.idUser.value,
      id_customer: idCustomer,
      name: user.name.value,
    });
    return { idUser: user.idUser.value, aplication: user.aplication.value };
  }
  async find(user) {
    const data = await db.doQuery(
      `SELECT user.id_user,person.name, email FROM user
      INNER JOIN person ON person.id_user = user.id_user
      WHERE user.id_user = ?`,
      user.idUser.value
    );
    if (data.length == 0) return false;
    await db.doQuery(
      `UPDATE user SET device_token = ? WHERE user.id_user = ?`,
      [user.deviceToken.value, user.idUser.value]
    );
    return {
      idUser: user.idUser.value,
      aplication: user.aplication.value,
    };
  }
}

module.exports = MySqlUserRepository;
