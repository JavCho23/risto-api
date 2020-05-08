const db = require("../../../../shared/domain/db");
const Location = require("../domain/location");
const RawString = require("../../../../shared/domain/value/raw_string");

class MySqlLocationRepository {
  async find(idLocation) {
    const data = await db.doQuery(
      `SELECT city.name, latitude,longitude,address 
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
}

module.exports = MySqlLocationRepository;
