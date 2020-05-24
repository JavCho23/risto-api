const MySqlDeliveryRepository = require("../infrastructure/mysql_delivery_repository");
const DeliveryAdder = require("../aplication/add/delivery_adder");
const MySqlOrderRepository = require("../../order/infrastructure/mysql_order_repository");
const OrderAdder = require("../../order/aplication/add/order_adder");
const JWT = require('jsonwebtoken');
const RawDouble = require("../../../shared/domain/value/raw_double");
const Uuid = require("../../../shared/domain/value/uuid");
const CreatedResponse = require("../../../shared/domain/response/created_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.addDelivery = async (event) => {
  const { headers } = event;
  const bodyRequest = JSON.parse(event.body);
  let response;
  try {
    const deliverAdder = new DeliveryAdder(new MySqlDeliveryRepository());
    await deliverAdder.call(
      new Uuid(bodyRequest.idDelivery),
      new Uuid(bodyRequest.idLocal),
      new Uuid(JWT.decode(headers["x-api-key"]).idUser),
      new Uuid(bodyRequest.idPayment),
      new RawDouble(bodyRequest.price),
      new RawDouble(bodyRequest.total),
      bodyRequest.orders,
      new OrderAdder(MySqlOrderRepository())
    );
    response = new CreatedResponse();
  } catch (error) {
    throw error;
    response = new ErrorResponse(error);
  }
  return response.toJson();
};
