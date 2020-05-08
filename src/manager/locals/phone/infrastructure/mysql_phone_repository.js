const db = require("../../../../shared/domain/db");
const Phone = require("../domain/phone");
const PhoneNumber = require("../domain/values/phone_number");
const RawString = require("../../../../shared/domain/value/raw_string");
const Uuid = require("../../../../shared/domain/value/uuid");

class MySqlPhoneRepository {
  async list(idLocal) {
    const data = await db.doQuery(
      `SELECT id_phone ,label, number 
      FROM phone WHERE phone.id_local = ? AND state = 1;`,
      idLocal.value
    );
    return data.map(
      (phone) =>
        new Phone(
          new Uuid(phone.idPhone),
          new RawString(phone.label),
          new PhoneNumber(phone.number)
        )
    );
  }
}

module.exports = MySqlPhoneRepository;
