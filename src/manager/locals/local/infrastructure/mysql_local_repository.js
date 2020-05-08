const db = require("../../../../shared/domain/db");
const Local = require("../domain/local");
const RawString = require("../../../../shared/domain/value/raw_string");
const RawDouble = require("../../../../shared/domain/value/raw_double");
const Uuid = require("../../../../shared/domain/value/uuid");
const NotFoundError = require("../../../../shared/domain/error/no_found_error");

class MySqlLocalRepository {
  async find(
    idLocal,
    phoneLister,
    findLocation,
    scheduleFinder,
    paymentsLister
  ) {
    const data = await db.doQuery(
      `SELECT id_location as idLocation, name, description, COUNT(follow.id_customer) as follows  
      FROM local
      LEFT JOIN follow ON follow.id_local = local.id_local
      WHERE local.id_local = ? AND local.state = 1;`,
      idLocal.value
    );
    if (data.length == 0) throw new NotFoundError();
    const localInfo = data[0];
    return new Local(
      idLocal,
      new RawString(localInfo.name),
      new RawString(localInfo.description),
      await findLocation.call(new Uuid(localInfo.idLocation)),
      new RawDouble(localInfo.follows),
      await phoneLister.call(idLocal),
      await scheduleFinder.call(idLocal),
      await paymentsLister.call(idLocal)
    );
  }
  async list(idSignature) {}
}

module.exports = MySqlLocalRepository;
