const db = require("../../../shared/domain/db");
const Location = require("../domain/location");
const RawString = require("../../../shared/domain/value/raw_string");
const Uuid = require("../../../shared/domain/value/uuid");
const { v4: uuidv4 } = require("uuid");

class MySqlLocationRepository {
    async find(idLocation) {
        const data = await db.doQuery(
            `SELECT city.name as city, latitude,longitude,address 
      FROM location 
      INNER JOIN city ON city.id_city = location.id_city 
      WHERE id_location = ? AND location.state = 1;`,
            idLocation.value
        );
        const location = data[0];
        return new Location(
            new RawString(location.address),
            new RawString(location.city),
            new RawString(location.latitude),
            new RawString(location.longitude)
        );
    }
    async update(idLocation, location) {
        const idCity = await this.findOrInsertCity(location.city);
        await db.doQuery(
            `UPDATE location SET ?
      WHERE id_location = ?`,
            [
                {
                    id_city: idCity.value,
                    latitude: location.latitude.value,
                    longitude: location.longitude.value,
                    address: location.address.value,
                    modified_at: new Date().toLocaleString(),
                },
                idLocation.value,
            ]
        );
    }
    async add(location) {
        const idCity = await this.findOrInsertCity(location.city);
        const idLocation = new Uuid(uuidv4());
        await db.doQuery("INSERT INTO location SET ?", {
            id_location: idLocation.value,
            id_city: idCity.value,
            latitude: location.latitude.value,
            longitude: location.longitude.value,
            address: location.address.value,
        });
        return idLocation;
    }
    async findOrInsertCity(city) {
        let data = await db.doQuery(
            "SELECT id_city as idCity, name FROM city WHERE name = ? AND state = 1;",
            city.value
        );
        let idCity;
        if (data.length == 0) {
            idCity = uuidv4();
            await db.doQuery(" INSERT INTO city SET ? ", {
                id_city: idCity,
                name: city.value,
                state: 1,
                created_at: new Date().toLocaleString(),
                modified_at: new Date().toLocaleString(),
            });
        } else idCity = data[0].idCity;
        return new Uuid(idCity);
    }
}

module.exports = MySqlLocationRepository;
