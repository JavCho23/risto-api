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
    locationFinder,
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
      await locationFinder.call(new Uuid(localInfo.idLocation)),
      new RawDouble(localInfo.follows),
      await phoneLister.call(idLocal),
      await scheduleFinder.call(idLocal),
      await paymentsLister.call(idLocal)
    );
  }

  async update(
    local,
    phoneLister,
    paymentsLister,
    locationUpdater,
    scheduleUpdater,
    phoneAdder,
    phoneRemover
  ) {
    const ids = await db.doQuery(
      `SELECT id_location as idLocation, schedule.id_schedule as idSchedule
      FROM local
      INNER JOIN schedule ON local.id_local = schedule.id_local
      WHERE local.id_local = ? AND local.state = 1;`,
      local.idLocal.value
    );
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
    await this.updatePhones(
      local.idLocal,
      local.phones,
      phoneLister,
      phoneAdder,
      phoneRemover
    );
    await scheduleUpdater.call(new Uuid(ids[0].idSchedule), local.schedule);
    await this.updatePayments(local.idLocal, local.payments, paymentsLister);
  }

  async updatePhones(idLocal, phones, phoneLister, phoneAdder, phoneRemover) {
    const oldPhones = await phoneLister.call(idLocal);
    for (let indexOld = 0; indexOld < oldPhones.length; indexOld++) {
      let delet = true;
      for (let indexPhone = 0; indexPhone < phones.length; indexPhone++) {
        if (
          phones[indexPhone].idPhone.value == oldPhones[indexOld].idPhone.value
        ) {
          phones.splice(indexPhone, 1);
          delet = false;
          break;
        }
      }
      if (delet) {
        await phoneRemover.call(oldPhones[indexOld].idPhone);
      }
    }
    if (phones.length > 0) {
      await Promise.all(
        phones.map(async (phone) => {
          console.log(phone);
          await phoneAdder.call(idLocal, phone);
        })
      );
    }
  }
  async updatePayments(idLocal, payments, paymentsLister) {
    const oldPayments = await paymentsLister.call(idLocal);
    for (let indexOld = 0; indexOld < oldPayments.length; indexOld++) {
      let delet = true;
      for (
        let indexPayment = 0;
        indexPayment < payments.length;
        indexPayment++
      ) {
        if (
          payments[indexPayment].value == oldPayments[indexOld].idPayment.value
        ) {
          payments.splice(indexPayment, 1);
          delet = false;
          break;
        }
      }
      if (delet) {
        await this.removePaymentMethod(
          oldPayments[indexOld].idPayment,
          idLocal
        );
      }
    }
    if (payments.length > 0) {
      await Promise.all(
        payments.map(async (payment) => {
          await this.addPaymentMethod(payment, idLocal);
        })
      );
    }
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
  async list(idSignature) {}
}

module.exports = MySqlLocalRepository;
