const MySqlNotificationRepository = require("../infrastructure/mysql_notification_repository");
const NotificationChecker = require("../aplication/check/notification_checker");
const Uuid = require("../../../shared/domain/value/uuid");
const NoContentResponse = require("../../../shared/domain/response/no_content_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");
exports.checkNotification = async (event) => {
  const { pathParameters } = event;
  let response;
  try {
    const notificationChecker = new NotificationChecker(
      new MySqlNotificationRepository()
    );
    await notificationChecker.call(new Uuid(pathParameters.id));
    response = new NoContentResponse();
  } catch (error) {
    response = new ErrorResponse(error);
  }
  return response.toJson();
};
