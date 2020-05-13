const db = require("../../../shared/domain/db");
const Local = require("../domain/local");
const RawString = require("../../../shared/domain/value/raw_string");
const RawDouble = require("../../../shared/domain/value/raw_double");
const Uuid = require("../../../shared/domain/value/uuid");
const NotFoundError = require("../../../shared/domain/error/no_found_error");

const LocalFilterUpdatePayments = require("./local_filter_update_payments");
const LocalFilterUpdatePhones = require("./local_filter_update_phones");
class MySqlLocalRepository {
  async find(idLocal, phoneLister, locationFinder, scheduleFinder, paymentsLister) {
    const data = await db.doQuery(
      `SELECT id_location as idLocation, name, description, COUNT(follow.id_customer) as follows  
      FROM local
      LEFT JOIN follow ON follow.id_local = local.id_local
      WHERE local.id_local = ? AND local.state = 1;`,
      idLocal.value
    );
    if (data[0].idLocation == null) throw new NotFoundError();
    const localInfo = data[0];
    return new Local(
      idLocal,
      new RawString(localInfo.name),
      new RawString(localInfo.description),
      await locationFinder.call(new Uuid(localInfo.idLocation)),
      new RawDouble(localInfo.follows),
      await phoneLister.call(idLocal),
      await scheduleFinder.call(idLocal),
      await paymentsLister.call(idLocal)
    );
  }

  async update(local, phoneLister,paymentsLister,locationUpdater,scheduleUpdater,phoneUpdater,phoneAdder,phoneRemover) {
    const ids = await db.doQuery(
      `SELECT id_location as idLocation, schedule.id_schedule as idSchedule
      FROM local
      INNER JOIN schedule ON local.id_local = schedule.id_local
      WHERE local.id_local = ? AND local.state = 1;`,
      local.idLocal.value
    );
    if (ids.length == 0) throw new NotFoundError();
    await db.doQuery(
      `UPDATE local SET ?
      WHERE id_local = ?`,
      [
        {
          name: local.name.value,
          description: local.description.value,
          modified_at: new Date().toLocaleString(),
        },
        local.idLocal.value,
      ]
    );
    await locationUpdater.call(new Uuid(ids[0].idLocation), local.location);
    const localFilterUpdatePayments = new LocalFilterUpdatePayments(
      local.idLocal,
      local.payments,
      paymentsLister,
      this.addPaymentMethod,
      this.removePaymentMethod
    );
    await localFilterUpdatePayments.call();

    const localFilterUpdatePhones = new LocalFilterUpdatePhones(
      local.idLocal,
      local.phones,
      phoneLister,
      phoneUpdater,
      phoneAdder,
      phoneRemover
    );
    await localFilterUpdatePhones.call();
    await scheduleUpdater.call(new Uuid(ids[0].idSchedule), local.schedule);
  }

  async rename(idLocal, name) {
    await db.doQuery(
      `UPDATE local SET name = ?, modified_at = NOW() 
      WHERE id_local = ?`,
      [name.value, idLocal.value]
    );
  }
  async remove(idLocal) {
    await db.doQuery(
      `UPDATE local SET state = 0, modified_at = NOW()
      WHERE id_local = ?`,
      idLocal.value
    );
  }
  async removePaymentMethod(idPayment, idLocal) {
    await db.doQuery(
      `DELETE FROM method
      WHERE id_payment = ? AND id_local = ?`,
      [idPayment.value, idLocal.value]
    );
  }
  async addPaymentMethod(idPayment, idLocal) {
    await db.doQuery(`INSERT INTO method SET ?`, {
      id_payment: idPayment.value,
      id_local: idLocal.value,
    });
  }

  async listBySignature( idSignature, phoneLister, locationFinder, scheduleFinder, paymentLister) {
    const data = await db.doQuery(
      `SELECT id_Local as idLocal
      FROM local
      INNER JOIN signature ON local.id_signature = signature.id_signature
      WHERE signature.id_signature = ? AND local.state = 1;`,
      [idSignature.value]
    );
    console.log(data);
    return await Promise.all(
      data.map(
        async (local) =>
          await this.find(
            new Uuid(local.idLocal),
            phoneLister,
            locationFinder,
            scheduleFinder,
            paymentLister
          )
      )
    );
  }
}

module.exports = MySqlLocalRepository;