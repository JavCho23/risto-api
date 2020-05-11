const db = require("../../../../shared/domain/db");
const Phone = require("../domain/phone");
const PhoneNumber = require("../domain/values/phone_number");
const RawString = require("../../../../shared/domain/value/raw_string");
const Uuid = require("../../../../shared/domain/value/uuid");

class MySqlPhoneRepository {
  async list(idLocal) {
    const data = await db.doQuery(
      `SELECT id_phone as idPhone ,label, number 
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
  async update(phone) {
    await db.doQuery(
      `UPDATE phone SET ?
      WHERE id_phone = ?`,
      [
        {
          label: phone.label.value,
          number: phone.number.value,
          modified_at: new Date().toLocaleString(),
        },
        phone.idPhone.value,
      ]
    );
  }
  async remove(idPhone) {
    await db.doQuery(
      `DELETE FROM phone
      WHERE id_phone = ?`,
      idPhone.value
    );
  }
  async add(idLocal, phone) {
    await db.doQuery(`INSERT INTO phone SET ?`, {
      id_phone: phone.idPhone.value,
      id_local: idLocal.value,
      label: phone.label.value,
      number: phone.number.value,
    });
  }
}

module.exports = MySqlPhoneRepository;
