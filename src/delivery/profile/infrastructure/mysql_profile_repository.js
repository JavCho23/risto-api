const db = require("../../../shared/domain/db");
const Profile = require("../domain/profile");
const RawString = require("../../../shared/domain/value/raw_string");
const Uuid = require("../../../shared/domain/value/uuid");
const NotFoundError = require("../../../shared/domain/error/no_found_error");

class MySqlLocalRepository {
    async find(idProfile, locationFinder) {
        const data = await db.doQuery(
            `SELECT id_location as idLocation, name, phone  
      FROM profile
      WHERE profile.id_profile = ? AND profile.state = 1;`,
            idProfile.value
        );
        if (data[0].idLocation == null) throw new NotFoundError();
        const profileInfo = data[0];
        return new Profile(
            idProfile,
            new RawString(profileInfo.name),
            new RawString(profileInfo.phone),
            await locationFinder.call(new Uuid(profileInfo.idLocation))
        );
    }

    async update(profile, locationUpdater) {
        const ids = await db.doQuery(
            `SELECT id_location as idLocation
      FROM profile
      WHERE profile.id_profile = ? AND profile.state = 1;`,
            profile.idProfile.value
        );
        if (ids.length == 0) throw new NotFoundError();
        await db.doQuery(
            `UPDATE profile SET ?
      WHERE id_profile = ?`,
            [
                {
                    name: profile.name.value,
                    description: profile.description.value,
                    modified_at: new Date().toLocaleString(),
                },
                profile.idProfile.value,
            ]
        );
        await locationUpdater.call(new Uuid(ids[0].idLocation), profile.location);
    }

    async remove(idProfile) {
        await db.doQuery(
            `UPDATE profile SET state = 0, modified_at = NOW()
      WHERE id_profile = ?`,
            idProfile.value
        );
    }

    async listByUser(idUser, locationFinder) {
        const data = await db.doQuery(
            `SELECT id_profile as idProfile
      FROM profile
      INNER JOIN customer ON profile.id_customer = customer.id_customer
      INNER JOIN person ON person.id_customer = customer.id_customer
      WHERE person.id_User = ? AND profile.state = 1;`,
            [idUser.value]
        );
        console.log(data);
        return await Promise.all(
            data.map(
                async (profile) =>
                    await this.find(new Uuid(profile.idProfile), locationFinder)
            )
        );
    }
    async add(idUser, profile, locationAdder) {
        const idLocation = await locationAdder.call(profile.location);
        const customer = await db.doQuery(
            "SELECT id_customer as idCustomer FROM person WHERE id_user = ?",
            idUser.value
        );
        await db.doQuery("INSERT INTO profile SET ?", {
            id_profile: profile.idProfile.value,
            id_customer: customer[0].idCustomer,
            id_location: idLocation.value,
            name: profile.name.value,
            phone: profile.phone.value,
        });
    }
}

module.exports = MySqlLocalRepository;
