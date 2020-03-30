const db = require("../../../shared/domain/db");
const MealNotExist = require("../domain/meal_not_exist");
const User = require("../domain/user");
const UserId = require("../../../shared/domain/user_id");
class MySqlUserRepository {
    async register(user) {
        const data = await db.doQuery(
            "INSERT INTO user SET ?",
            user.toJson()
        );
        return true;
    }
    async find(userId) {
        const data = await db.doQuery(
            "SELECT id_user FROM user WHERE id_user = ?",
            userId.value
        );
        if (data.length == 0) return false;
        return new UserId(data[0].id_user);
    }
}

module.exports = MySqlUserRepository;
