const db = require("../../../shared/domain/db");
const Delivery = require("../domain/delivery");
const Order = require("../../order/domain/order");
const State = require("../../state/domain/state");
const RawString = require("../../../shared/domain/value/raw_string");
const RawDouble = require("../../../shared/domain/value/raw_double");
const Uuid = require("../../../shared/domain/value/uuid");
const NotFoundError = require("../../../shared/domain/error/no_found_error");
const states = require("../../state/infrastructure/persistence/states.json");
class MySqlDeliveryRepository {
  async find(idDelivery, locationFinder, paymentFinder, orderLister, idUser) {
    const data = await db.doQuery(
      `SELECT delivery.id_delivery as idDelivery, local.id_local as idLocal, status.name as statusName, status.id_status as idStatus, report.coment as statusComent , profile.name, local.name as local, delivery.created_at as date, profile.id_location as idLocation, delivery.price,delivery.total, delivery.id_payment as idPayment
      FROM delivery 
      INNER JOIN profile ON profile.id_profile = delivery.id_profile
      INNER JOIN person ON person.id_customer = profile.id_customer
      INNER JOIN report ON report.id_delivery = delivery.id_delivery 
      INNER JOIN status ON report.id_status = status.id_status 
      INNER JOIN local ON local.id_local = delivery.id_local
			WHERE delivery.id_delivery = ?
			ORDER BY report.created_at DESC
			LIMIT 1;`,
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
      new State(
        new Uuid(deliveryInfo.idStatus),
        new RawString(deliveryInfo.statusName),
        new RawString(deliveryInfo.statusComent)
      ),
      await locationFinder.call(idDelivery),
      await orderLister.call(idDelivery, idUser),
      new RawDouble(deliveryInfo.price),
      new RawDouble(deliveryInfo.total),
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
      [idLocal.value, states.cancel.id, states.finish.id, days.value]
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
      [idLocal.value, states.cancel.id, states.finish.id, days.value]
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

  async findUserOwner(idDelivery) {
    const user = db.doQuery(
      `SELECT user.id_user as idUser 
    FROM user 
    INNER JOIN person ON user.id_user = person.id_user
    INNER JOIN profile ON person.id_customer = profile.id_customer
    INNER JOIN delivery ON delivery.id_profile = profile.id_profile
    WHERE delivery.id_delivery = ?`,
      idDelivery.value
    );
    return new Uuid(user[0].idUser);
  }
  async findLocalOwner(idDelivery) {
    const local = db.doQuery(
      `SELECT local.id_local as idLocal FROM local 
      INNER JOIN delivery ON delivery.id_local = local.id_local
      WHERE delivery.id_delivery = ?`,
      idDelivery.value
    );
    return new Uuid(local[0].idLocal);
  }
  async add(
    idDelivery,
    idLocal,
    idProfile,
    idPayment,
    comment,
    price,
    total,
    orders,
    orderAdder,
    deliveryCreatedNotification,
    allPersonalLister,
    tokenDeviceFinder
  ) {
    await db.doQuery("INSERT INTO delivery SET ?", {
      id_delivery: idDelivery.value,
      id_local: idLocal.value,
      id_profile: idProfile.value,
      id_payment: idPayment.value,
      price: price.value,
      total: total.value,
    });
    await Promise.all(
      orders.map(async (order) => {
        await orderAdder.call(idDelivery, Order.fromJson(order));
      })
    );
    await deliveryCreatedNotification.call(
      idLocal,
      idDelivery,
      new State(
        new Uuid(states.pending.id),
        new RawString(states.pending.name),
        new RawString(comment)
      ),
      allPersonalLister,
      tokenDeviceFinder
    );
  }

  async changeState(
    state,
    idDelivery,
    deliveryCancelNotification,
    deliveryProcessNotification,
    deliveryFinishNotification,
    allPersonalLister,
    tokenDeviceFinder,
    recordAdder
  ) {
    let type;
    const idLocal = await this.findLocalOwner(idDelivery);
    if (state.value == "process") {
      this.processDelivery(
        idDelivery,
        comment,
        deliveryProcessNotification,
        tokenDeviceFinder
      );
      type = "procesando";
    } else if (state.value == "cancel") {
      this.cancelDelivery(
        idDelivery,
        deliveryCancelNotification,
        allPersonalLister,
        tokenDeviceFinder
      );
      type = "cancelado";
    } else if (state.value == "finish") {
      this.finishDelivery(
        idDelivery,
        comment,
        deliveryFinishNotification,
        tokenDeviceFinder
      );
      type = "finalizado";
    }
    recordAdder.call("ha cambiado el estado del delivery a " + type, idLocal);
  }

  async processDelivery(
    idDelivery,
    comment,
    deliveryProcessNotification,
    tokenDeviceFinder
  ) {
    await deliveryProcessNotification(
      await this.findUserOwner(idDelivery),
      idDelivery,
      new State(
        new Uuid(states.incoming.id),
        new RawString(states.incoming.name),
        new RawString(comment)
      ),
      tokenDeviceFinder
    );
  }
  async finishDelivery(
    idDelivery,
    comment,
    deliveryFinishNotification,
    tokenDeviceFinder
  ) {
    await deliveryFinishNotification(
      await this.findUserOwner(idDelivery),
      idDelivery,
      new State(
        new Uuid(states.finish.id),
        new RawString(states.finish.name),
        new RawString(comment)
      ),
      tokenDeviceFinder
    );
  }
  async cancelDelivery(
    idDelivery,
    comment,
    deliveryCancelNotification,
    allPersonalLister,
    tokenDeviceFinder
  ) {
    await deliveryCancelNotification(
      await this.findLocalOwner(idDelivery),
      await this.findUserOwner(idDelivery),
      idDelivery,
      new State(
        new Uuid(states.finish.id),
        new RawString(states.finish.name),
        new RawString(comment)
      ),
      allPersonalLister,
      tokenDeviceFinder
    );
  }
}

module.exports = MySqlDeliveryRepository;
