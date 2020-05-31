const db = require("../../../shared/domain/db");
const User = require("../domain/user");
const RawString = require("../../../shared/domain/value/raw_string");
const Uuid = require("../../../shared/domain/value/uuid");

class MySqlUserRepository {
    async findDeviceToken(idUser) {
        const data = await db.doQuery(
            `SELECT user.device_token as deviceToken FROM user 
      WHERE user.id_user = ?`,
            idUser.value
        );

        return new RawString(data[0].deviceToken);
    }
    async list(query) {
        if (query.value.length < 4) return [];
        const data = await db.doQuery(
            `SELECT user.id_user as idUser ,user.email, person.name FROM user 
      INNER JOIN person ON person.id_user = user.id_user
      WHERE user.email LIKE '%?%' OR  person.name LIKE '%?%'`,
            [query.value, query.value]
        );
        return data.map(
            (user) =>
                new User(
                    new Uuid(user.idUser),
                    new RawString(user.name),
                    new RawString(user.email)
                )
        );
    }
    async isFollow(idLocal, idUser) {
        const data = await db.doQuery(
            `SELECT follow.id_customer FROM follow
      INNER JOIN person ON person.id_customer = follow.id_customer
      WHERE person.id_user = ? AND follow.id_local = ?'`,
            [idUser.value, idLocal.value]
        );
        if (data.length == 0) return { isFollow: false };
        return { isFollow: true };
    }
    async follow(idLocal, idUser) {
        const data = await db.doQuery(
            `SELECT follow.id_customer as idCustomer FROM follow
      INNER JOIN person ON person.id_customer = follow.id_customer
      WHERE person.id_user = ? AND follow.id_local = ?'`,
            [idUser.value, idLocal.value]
        );
        if (data.length == 0) await this.addFollow(idLocal, idUser);
        else await this.removeFollow(idLocal, new Uuid(data[0].idCustumer));
    }
    async removeFollow(idLocal, idCustumer) {
        const data = await db.doQuery(
            "DELETE FROM follow WHERE id_customer = ? AND id_local = ?",
            [idCustumer.value, idLocal.value]
        );
        if (data.length == 0) return { isAvialable: false };
        return { isAvialable: true };
    }
    async addFollow(idLocal, idUser) {
        const data = await db.doQuery(
            `SELECT id_customer FROM person
      WHERE person.id_user = ?`,
            [idUser.value]
        );
        await db.doQuery("INSERT INTO follow SET ?", {
            id_local: idLocal.value,
            id_customer: data[0].id_customer,
        });
    }
}

module.exports = MySqlUserRepository;
