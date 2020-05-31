const MySqlDeliveryRepository = require("../infrastructure/mysql_delivery_repository");
const DeliveryAdder = require("../aplication/add/delivery_adder");
const MySqlOrderRepository = require("../../order/infrastructure/mysql_order_repository");
const OrderAdder = require("../../order/aplication/add/order_adder");
const DeliveryCreatedNotifier = require("../../notification/aplication/deliveryNotifications/delivery_created_notifier");
const MySqlNotificaionRepository = require("../../notification/infrastructure/mysql_notification_repository");
const MySqlPersonalRepository = require("../../personal/infrastructure/mysql_personal_repository");
const AllPersonalLister = require("../../personal/aplication/list/all_personal_lister");
const MySqlUserRepository = require("../../user/infrastructure/mysql_user_repository");
const DeviceTokenFinder = require("../../user/aplication/find/user_device_token_finder");

const CreatedResponse = require("../../../shared/domain/response/created_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");
const RawDouble = require("../../../shared/domain/value/raw_double");
const RawString = require("../../../shared/domain/value/raw_string");
const Uuid = require("../../../shared/domain/value/uuid");
exports.addDelivery = async (event) => {
  const bodyRequest = JSON.parse(event.body);
  let response;
  try {
    const deliverAdder = new DeliveryAdder(new MySqlDeliveryRepository());
    await deliverAdder.call(
      new Uuid(bodyRequest.idDelivery),
      new Uuid(bodyRequest.idLocal),
      new Uuid(bodyRequest.idProfile),
      new Uuid(bodyRequest.idPayment),
      new RawString(bodyRequest.comment),
      new RawDouble(bodyRequest.price),
      new RawDouble(bodyRequest.total),
      bodyRequest.products,
      new OrderAdder(new MySqlOrderRepository()),
      new DeliveryCreatedNotifier(new MySqlNotificaionRepository()),
      new AllPersonalLister(new MySqlPersonalRepository()),
      new DeviceTokenFinder(new MySqlUserRepository())
    );
    response = new CreatedResponse();
  } catch (error) {
    response = new ErrorResponse(error);
  }
  return response.toJson();
};
