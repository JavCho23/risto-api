const db = require("../../../shared/domain/db");
const Delivery = require("../domain/delivery");
const Order = require("../../order/domain/order");
const RawString = require("../../../shared/domain/value/raw_string");
const RawDouble = require("../../../shared/domain/value/raw_double");
const Uuid = require("../../../shared/domain/value/uuid");
const NotFoundError = require("../../../shared/domain/error/no_found_error");

class MySqlDeliveryRepository {
  async find(idDelivery, locationFinder, paymentFinder, orderLister,idUser) {
    const data = await db.doQuery(
      `SELECT delivery.id_delivery as idDelivery, local.id_local as idLocal, status.name as status , profile.name, local.name as local, delivery.created_at as date, profile.id_location as idLocation, delivery.price, delivery.id_payment as idPayment
      FROM delivery 
      INNER JOIN profile ON profile.id_profile = delivery.id_profile
      INNER JOIN person ON person.id_customer = profile.id_customer
      INNER JOIN report ON report.id_delivery = delivery.id_delivery 
      INNER JOIN status ON report.id_status = status.id_status 
      INNER JOIN local ON local.id_local = delivery.id_local
      WHERE person.id_user = ? ;`,
      idDelivery.value
    );
    if (data[0].length == 0) throw new NotFoundError();
    const deliveryInfo = data[0];
    return new Delivery(
      idDelivery,
      new Uuid(deliveryInfo.idLocal),
      new RawString(deliveryInfo.local),
      new RawString(deliveryInfo.name),
      new RawString(deliveryInfo.date),
      new RawString(deliveryInfo.status),
      await locationFinder.call(idDelivery),
      await orderLister.call(idDelivery, idUser),
      new RawDouble(deliveryInfo.price),
      await paymentFinder.call(new Uuid(deliveryInfo.idPayment))
    );
  }
  async listByClient(idUser, locationFinder, paymentFinder, orderLister) {
    const data = await db.doQuery(
      "SELECT delivery.id_delivery as idDelivery FROM delivery INNER JOIN `profile` ON `profile`.id_profile = delivery.id_profile INNER JOIN person ON person.id_customer = `profile`.id_customer WHERE person.id_user = ?;",
      [idUser.value]
    );
    return await Promise.all(
      data.map(
        async (delivery) =>
          await this.find(
            new Uuid(delivery.idDelivery),
            locationFinder,
            paymentFinder,
            orderLister,
            idUser
          )
      )
    );
  }
  async listByLocalActive(
    idLocal,
    locationFinder,
    paymentFinder,
    orderLister,
    days
  ) {
    const data = await db.doQuery(
      `SELECT delivery.id_delivery as idDelivery 
      FROM delivery 
      INNER JOIN report ON report.id_delivery = delivery.id_delivery   
      WHERE delivery.id_local = ? AND (report.id_status != ? AND report.id_status != ?) AND delivery.modified_at >= DATE_ADD(delivery.modified_at, INTERVAL -? DAY);`,
      [
        idLocal.value,
        "2686770e-02b1-45b7-94f0-bbf47f9c1a63",
        "37ef3505-3d8c-4a61-8533-1b8332549520",
        days.value,
      ]
    );
    return await Promise.all(
      data.map(
        async (delivery) =>
          await this.find(
            new Uuid(delivery.idDelivery),
            locationFinder,
            paymentFinder,
            orderLister
          )
      )
    );
  }
  async listByLocalHistory(
    idLocal,
    locationFinder,
    paymentFinder,
    orderLister,
    days
  ) {
    const data = await db.doQuery(
      `SELECT delivery.id_delivery as idDelivery 
      FROM delivery 
      INNER JOIN report ON report.id_delivery = delivery.id_delivery   
      WHERE delivery.id_local = ? AND (report.id_status = ? OR report.id_status = ?) AND delivery.modified_at >= DATE_ADD(delivery.modified_at, INTERVAL -? DAY);`,
      [
        idLocal.value,
        "2686770e-02b1-45b7-94f0-bbf47f9c1a63",
        "37ef3505-3d8c-4a61-8533-1b8332549520",
        days.value,
      ]
    );
    return await Promise.all(
      data.map(
        async (delivery) =>
          await this.find(
            new Uuid(delivery.idDelivery),
            locationFinder,
            paymentFinder,
            orderLister
          )
      )
    );
  }

  async add(idDelivery, idLocal, idUser, idPayment, price, orders, orderAdder) {
    const profile = await db.doQuery(
      `SELECT profile.id_profile as idProfile, id_location as idProfile FROM profile
    INNER JOIN person ON profile.id_customer = person.id_customer
    WHERE person.id_user = ?`,
      idUser.value
    );
    await db.doQuery("INSERT INTO delivery SET ?", {
      id_delivery: idDelivery.value,
      id_local: idLocal.value,
      id_profile: profile[0].idProfile,
      id_payment: idPayment.value,
      price: price.value,
    });
    await Promise.all(
      orders.map(
        async (order) => await orderAdder(idDelivery, Order.fromJson(order))
      )
    );
  }

  async changeState(state, idDelivery) {
    if (state.value == "process") {
      this.processDelivery(idDelivery);
    } else if (state.value == "cancel") {
      this.cancelDelivery(idDelivery);
    } else if (state.value == "finish") {
      this.finishDelivery(idDelivery);
    }
  }
  async processDelivery(idDelivery) {
    await db.doQuery("UPDATE record SET id_status = ? WHERE id_delivery = ?", [
      "1a80f704-15cb-446c-813b-df649f8a3d04",
      idDelivery.value,
    ]);
  }
  async finishDelivery(idDelivery) {
    await db.doQuery("UPDATE record SET id_status = ? WHERE id_delivery = ?", [
      "2686770e-02b1-45b7-94f0-bbf47f9c1a63",
      idDelivery.value,
    ]);
  }
  async cancelDelivery(idDelivery) {
    await db.doQuery("UPDATE record SET id_status = ? WHERE id_delivery = ?", [
      "37ef3505-3d8c-4a61-8533-1b8332549520",
      idDelivery.value,
    ]);
  }
}

module.exports = MySqlDeliveryRepository;
