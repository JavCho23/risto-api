const db = require("../../../shared/domain/db");
const Event = require("../../../shared/event_domain/domain/event_domain");
const RawString = require("../../../shared/domain/value/raw_string");
const RawBool = require("../../../shared/domain/value/raw_bool");
const Uuid = require("../../../shared/domain/value/uuid");
const EventSender = require("../../../shared/event_domain/aplication/send/event_domain_sender");
const FirebaseEventRepository = require("../../../shared/event_domain/infrastructure/firebase_event_repository");
const templateNotifications = require("./persistence/message_notifications.json");
const Notification = require("../domain/notification");
const { v4: uuidv4 } = require("uuid");
class MySqlNotificationRepository {
  async list(idUser) {
    const data = await db.doQuery(
      `SELECT id_notification as idNotification, title, message, created_at as date, checked FROM notification
      WHERE id_user = ?`,
      idUser.value
    );
    return await Promise.all(
      data.map(
        async (notification) =>
          new Notification(
            new Uuid(notification.idNotification),
            await this.findDelivery(new Uuid(notification.idNotification)),
            new Event(
              new RawString(notification.title),
              new RawString(notification.message)
            ),
            new RawString(notification.date),
            new RawBool(notification.checked)
          )
      )
    );
  }
  async findDelivery(idNotification) {
    const data = await db.doQuery(
      `SELECT delivery.id_delivery as idDelivery FROM delivery 
      INNER JOIN report ON report.id_delivery = delivery.id_delivery
      WHERE report.id_notification = ? LIMIT 1`,
      idNotification.value
    );
    return new Uuid(data[0].idDelivery);
  }
  async check(idNotification) {
    await db.doQuery(
      `UPDATE notification SET checked = 1 WHERE id_notification = ?`,
      idNotification.value
    );
  }
  async sendNotification(event, deviceTokens) {
    const eventSender = new EventSender(new FirebaseEventRepository());
    await eventSender.call(event, deviceTokens);
  }
  async createLocalNotification(
    idLocal,
    idDelivery,
    state,
    event,
    allPersonalLister,
    tokenDeviceFinder
  ) {
    const personals = await allPersonalLister.call(idLocal);
    const deviceTokens = await Promise.all(
      personals.map(async (personal) => {
        return await tokenDeviceFinder.call(personal.idUser);
      })
    );
    await Promise.all(
      personals.map(async (personal) => {
        const idNotification = uuidv4();
        await db.doQuery("INSERT INTO notification SET ?", {
          id_notification: idNotification,
          id_user: personal.idUser.value,
          title: event.title.value,
          message: event.message.value,
        });
        await db.doQuery("INSERT INTO report SET ?", {
          id_status: state.idState.value,
          id_notification: idNotification,
          id_delivery: idDelivery.value,
          comment: state.comment.value,
        });
      })
    );
     await this.sendNotification(event, deviceTokens);
  }
  async createUserNotification(
    idUser,
    idDelivery,
    state,
    event,
    tokenDeviceFinder
  ) {
    const deviceToken = await tokenDeviceFinder.call(idUser);
    const idNotification = uuidv4();
    await db.doQuery("INSERT INTO notification SET ?", {
      id_notification: idNotification,
      id_user: idUser.value,
      title: event.title.value,
      message: event.message.value,
    });
    await db.doQuery("INSERT INTO report SET ?", {
      id_status: state.idState.value,
      id_notification: idNotification,
      id_delivery: idDelivery.value,
      comment: state.comment.value,
    });
    await this.sendNotification(event, [deviceToken]);
  }
  async deliveryCreatedNotification(
    idLocal,
    idDelivery,
    state,
    allPersonalLister,
    tokenDeviceFinder
  ) {
    const event = new Event(
      new RawString(templateNotifications.local.newDelivery.title),
      new RawString(
        templateNotifications.local.newDelivery.message + state.comment.value
      )
    );
    await this.createLocalNotification(
      idLocal,
      idDelivery,
      state,
      event,
      allPersonalLister,
      tokenDeviceFinder
    );
  }
  async deliveryProcessNotification(
    idUser,
    idDelivery,
    state,
    tokenDeviceFinder
  ) {
    const event = new Event(
      new RawString(templateNotifications.client.incomingDelivery.title),
      new RawString(
        templateNotifications.client.incomingDelivery.message +
          state.comment.value
      )
    );
    await this.createUserNotification(
      idUser,
      idDelivery,
      state,
      event,
      tokenDeviceFinder
    );
  }
  async deliveryFinishNotification(
    idUser,
    idDelivery,
    state,
    tokenDeviceFinder
  ) {
    const event = new Event(
      new RawString(templateNotifications.client.finishDelivery.title),
      new RawString(
        templateNotifications.client.finishDelivery.message +
          state.comment.value
      )
    );
    await this.createUserNotification(
      idUser,
      idDelivery,
      state,
      event,
      tokenDeviceFinder
    );
  }
  async deliveryCancelNotification(
    idLocal,
    idUser,
    idDelivery,
    state,
    allPersonalLister,
    tokenDeviceFinder
  ) {
    const event = new Event(
      new RawString(templateNotifications.shared.cancelDelivery.title),
      new RawString(
        templateNotifications.shared.cancelDelivery.message +
          state.comment.value
      )
    );
    await this.createLocalNotification(
      idLocal,
      idDelivery,
      state,
      event,
      allPersonalLister,
      tokenDeviceFinder
    );
    await this.createUserNotification(
      idUser,
      idDelivery,
      state,
      event,
      tokenDeviceFinder
    );
  }
}

module.exports = MySqlNotificationRepository;
