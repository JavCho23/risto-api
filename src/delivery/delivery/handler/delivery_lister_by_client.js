const MySqlDeliveryRepository = require("../infrastructure/mysql_delivery_repository");
const DeliveryLister = require("../aplication/list/delivery_client_lister");
const MySqlLocationRepository = require("../../location/infrastructure/mysql_location_repository");
const LocationFinder = require("../../location/aplication/find/location_finder");
const MySqlOrderRepository = require("../../order/infrastructure/mysql_order_repository");
const OrderLister = require("../../order/aplication/list/order_lister");
const MySqlPaymentRepository = require("../../payment/infrastructure/mysql_payment_repository");
const PaymentFinder = require("../../payment/aplication/find/payment_finder");
const RawString = require("../../../shared/domain/value/raw_string");
const SuccessResponse = require("../../../shared/domain/response/success_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.listDeliveryByClient = async (event) => {
    const { headers } = event;
    let response;
    try {
        const deliveryLister = new DeliveryLister(new MySqlDeliveryRepository());
        const body = await deliveryLister.call(
            new RawString(JWT.decode(headers["Authorization"]).idUser),
            new LocationFinder(new MySqlLocationRepository()),
            new PaymentFinder(new MySqlPaymentRepository()),
            new OrderLister(new MySqlOrderRepository())
        );
        response = new SuccessResponse(body.map((delivery) => delivery.toJson()));
    } catch (error) {
        response = new ErrorResponse(error);
    }
    return response.toJson();
};
