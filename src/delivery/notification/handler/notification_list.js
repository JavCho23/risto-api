const MySqlNotificationRepository = require("../infrastructure/mysql_notification_repository");
const NotificationLister = require("../aplication/list/notification_lister");
const RawString = require("../../../shared/domain/value/raw_string");
const SuccessResponse = require("../../../shared/domain/response/success_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");
const JWT = require("jsonwebtoken");
exports.listNotification = async (event) => {
  const { headers } = event;
  let response;
  try {
    const notificationLister = new NotificationLister(
      new MySqlNotificationRepository()
    );
    const body = await notificationLister.call(
      new RawString(JWT.decode(headers["Authorization"]).idUser)
    );
    response = new SuccessResponse(
      body.map((notification) => notification.toJson())
    );
  } catch (error) {
    response = new ErrorResponse(error);
  }
  return response.toJson();
};
