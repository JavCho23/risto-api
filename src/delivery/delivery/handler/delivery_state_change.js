const MySqlDeliveryRepository = require("../infrastructure/mysql_delivery_repository");
const DeliveryStateChanger = require("../aplication/change_state/delivery_state_changer");
const MySqlNotificationRepository = require("../../notification/infrastructure/mysql_notification_repository");
const DeliveryCancelNotification = require("../../notification/aplication/deliveryNotifications/delivery_cancel_notifier");
const DeliveryFinishNotification = require("../../notification/aplication/deliveryNotifications/delivery_finish_notifier");
const DeliveryProcessNotification = require("../../notification/aplication/deliveryNotifications/delivery_process_notifier");
const MySqlPersonalRepository = require("../../personal/infrastructure/mysql_personal_repository");
const AllPersonalLister = require("../../personal/aplication/list/all_personal_lister");
const MySqlUserRepository = require("../../user/infrastructure/mysql_user_repository");
const DeviceTokenFinder = require("../../user/aplication/find/user_device_token_finder");
const RecordAdder = require("../../record/aplication/add/record_adder");
const MySqlRecordRepository = require("../../record/infrastructure/mysql_record_repository");
const JWT = require("jsonwebtoken");
const RawString = require("../../../shared/domain/value/raw_string");
const Uuid = require("../../../shared/domain/value/uuid");
const NoContentResponse = require("../../../shared/domain/response/no_content_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");
const UnauthorizedError = require("../../../shared/domain/error/unauthorized_error");

exports.changeDeliveryState = async (event) => {
    const { pathParameters, queryStringPatameters, headers } = event;
    let response;
    try {
        const deliveryStateChanger = new DeliveryStateChanger(
            new MySqlDeliveryRepository()
        );
        if (
            JWT.decode(headers["Authorization"]).aplication == "client" &&
      queryStringPatameters.type != "cancel"
        )
            throw new UnauthorizedError();
        await deliveryStateChanger.call(
            new RawString(queryStringPatameters.type),
            new Uuid(pathParameters.id),
            new DeliveryCancelNotification(new MySqlNotificationRepository()),
            new DeliveryProcessNotification(new MySqlNotificationRepository()),
            new DeliveryFinishNotification(new MySqlNotificationRepository()),
            new AllPersonalLister(new MySqlPersonalRepository()),
            new DeviceTokenFinder(new MySqlUserRepository()),
            new RecordAdder(
                new RawString(JWT.decode(headers["Authorization"]).idUser),
                new MySqlRecordRepository()
            )
        );
        response = new NoContentResponse();
    } catch (error) {
        throw error;
        response = new ErrorResponse(error);
    }
    return response.toJson();
};
