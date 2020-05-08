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
            "SELECT id_user, username,email FROM user WHERE id_user = ?",
            userId.value
        );
        if (data.length == 0) return false;
        return new User({
            id: data[0].id,
            username: data[0].username,
            email: data[0].email,
        });
    }
}

module.exports = MySqlUserRepository;
