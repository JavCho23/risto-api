const db = require("../../../shared/domain/db");
const User = require("../domain/user");
class MySqlUserRepository {
  async register(dataUser) {
    const user = new User(dataUser);
    const data = await db.doQuery("INSERT INTO user SET ?", user.toJson());
    return user;
  }
  async find(userId) {
    const data = await db.doQuery(
      `SELECT user.id_user,person.name, email FROM user
            INNER JOIN person ON person.id_user = user.id_user
            WHERE user.id_user = ?`,
      userId.value
    );
    if (data.length == 0) return false;
    return new User({
      id: data[0].id,
      username: data[0].name,
      email: data[0].email,
    });
  }
}

module.exports = MySqlUserRepository;
