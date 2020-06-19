const db = require("../../../shared/domain/db");
const Local = require("../domain/local");
const RawString = require("../../../shared/domain/value/raw_string");
const Uuid = require("../../../shared/domain/value/uuid");
const Utils = require("../../../shared/domain/utils");
const NotFoundError = require("../../../shared/domain/error/no_found_error");

const LocalFilterUpdatePayments = require("./local_filter_update_payments");
const LocalFilterUpdatePhones = require("./local_filter_update_phones");
const RawNumber = require("../../../shared/domain/value/raw_double");
class MySqlLocalRepository {
  async find(
    idLocal,
    phoneLister,
    locationFinder,
    scheduleFinder,
    paymentsLister
  ) {
    const data = await db.doQuery(
      `SELECT id_location as idLocation, local.name, description, local.delivery_price as deliveryPrice, COUNT(follow.id_customer) as follows, tag.name as category  
      FROM local
      INNER JOIN tag ON tag.id_tag = local.id_tag
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
      new RawString(this.singularize(localInfo.category)),
      new RawNumber(localInfo.deliveryPrice),
      await locationFinder.call(new Uuid(localInfo.idLocation)),
      new RawNumber(localInfo.follows),
      await phoneLister.call(idLocal),
      await scheduleFinder.call(idLocal),
      await paymentsLister.call(idLocal)
    );
  }
  async getDeliveryPrice(idLocal, paymentsLister) {
    const data = await db.doQuery(
      `SELECT delivery_price as price
      FROM local
      WHERE id_local = ? AND local.state = 1;`,
      [idLocal.value]
    );
    if (data.length == 0) throw new NotFoundError();
    const payments = await paymentsLister.call(idLocal);
    return {
      price: data[0].price,
      payments: payments.map(payment=> payment.toJson()),
    };
  }
  async update(
    local,
    phoneLister,
    paymentsLister,
    locationUpdater,
    scheduleUpdater,
    phoneUpdater,
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
    if (ids.length == 0) throw new NotFoundError();
    await db.doQuery(
      `UPDATE local SET ?
      WHERE id_local = ?`,
      [
        {
          name: local.name.value,
          description: local.description.value,
          delivery_price: local.deliveryPrice.value,
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
  singularize(word) {
    word = word.split("");
    if (word[word.length - 2] == "E") {
      word.splice(word.length - 2, 2);
      return word.join("");
    }
    word.splice(word.length - 1, 2);
    return word.join("");
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
    await db.doQuery("INSERT INTO method SET ?", {
      id_payment: idPayment.value,
      id_local: idLocal.value,
    });
  }

  async listBySignature(
    idSignature,
    phoneLister,
    locationFinder,
    scheduleFinder,
    paymentLister
  ) {
    const data = await db.doQuery(
      `SELECT id_Local as idLocal
      FROM local
      INNER JOIN signature ON local.id_signature = signature.id_signature
      WHERE signature.id_signature = ? AND local.state = 1;`,
      [idSignature.value]
    );
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

  async listFavorites(
    idUser,
    limit,
    offset,
    phoneLister,
    locationFinder,
    scheduleFinder,
    paymentLister
  ) {
    let data = await db.doQuery(
      `SELECT local.id_Local as idLocal
      FROM local
      INNER JOIN follow ON follow.id_local = local.id_local
      INNER JOIN person ON follow.id_customer = person.id_customer
      WHERE person.id_user = ?`,
      idUser.value
    );
    data = Utils.paginate(data, limit.value, offset.value);

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
  async listNear(
    location,
    limit,
    offset,
    phoneLister,
    locationFinder,
    scheduleFinder,
    paymentLister
  ) {
    const data = await db.doQuery(
      `SELECT id_Local as idLocal
      FROM local
      INNER JOIN location ON local.id_location = location.id_location
      WHERE ROUND(location.latitude,0) = ROUND(?,0) AND ROUND(location.longitude,0) = ROUND(?,0) AND local.state = 1;`,
      [location.latitude, location.longitude]
    );
    const locals = await Promise.all(
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
    locals.sort(function (a, b) {
      if (
        a.location.getDistance(location.latitude, location.longitude) >
        b.location.getDistance(location.latitude, location.longitude)
      ) {
        return 1;
      }
      if (
        a.location.getDistance(location.latitude, location.longitude) <
        b.location.getDistance(location.latitude, location.longitude)
      ) {
        return -1;
      }
      return 0;
    });
    return Utils.paginate(locals, limit.value, offset.value);
  }
  async listPopular(
    limit,
    offset,
    phoneLister,
    locationFinder,
    scheduleFinder,
    paymentLister
  ) {
    let data = await db.doQuery(
      `SELECT id_Local as idLocal
      FROM local
      WHERE local.state = 1;`
    );

    data = Utils.shuffle(data);
    data = Utils.paginate(data, limit.value, offset.value);
    const locals = await Promise.all(
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
    return locals;
  }
}

module.exports = MySqlLocalRepository;
