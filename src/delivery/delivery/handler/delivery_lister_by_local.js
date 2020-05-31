const MySqlDeliveryRepository = require("../infrastructure/mysql_delivery_repository");
const DeliveryLister = require("../aplication/list/delivery_local_lister");
const MySqlLocationRepository = require("../../location/infrastructure/mysql_location_repository");
const LocationFinder = require("../../location/aplication/find/location_finder");
const MySqlOrderRepository = require("../../order/infrastructure/mysql_order_repository");
const OrderLister = require("../../order/aplication/list/order_local_lister");
const MySqlPaymentRepository = require("../../payment/infrastructure/mysql_payment_repository");
const PaymentFinder = require("../../payment/aplication/find/payment_finder");

const Uuid = require("../../../shared/domain/value/uuid");
const RawNumber = require("../../../shared/domain/value/raw_double");
const SuccessResponse = require("../../../shared/domain/response/success_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.listDeliveryByLocal = async (event) => {
    const { pathParameters, queryStringParameters } = event;
    let response;
    try {
        const deliveryLister = new DeliveryLister(new MySqlDeliveryRepository());
        const body = await deliveryLister.call(
            new Uuid(pathParameters.id),
            new LocationFinder(new MySqlLocationRepository()),
            new PaymentFinder(new MySqlPaymentRepository()),
            new OrderLister(new MySqlOrderRepository()),
            queryStringParameters.type,
            new RawNumber(queryStringParameters.days | 7)
        );
        response = new SuccessResponse(body.map((delivery) => delivery.toJson()));
    } catch (error) {
        response = new ErrorResponse(error);
    }
    return response.toJson();
};
