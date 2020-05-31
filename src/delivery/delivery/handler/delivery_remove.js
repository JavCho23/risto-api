const MySqlDeliveryRepository = require("../infrastructure/mysql_delivery_repository");
const DeliveryRemover = require("../aplication/remove/delivery_remover");

const NoContentResponse = require("../../../shared/domain/response/no_content_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");
const Uuid = require("../../../shared/domain/value/uuid");
exports.removeDelivery = async (event) => {
    const { pathParameters } = event;
    let response;
    try {
        const deliverRemover = new DeliveryRemover(new MySqlDeliveryRepository());
        await deliverRemover.call(new Uuid(pathParameters.id));
        response = new NoContentResponse();
    } catch (error) {
        response = new ErrorResponse(error);
    }
    return response.toJson();
};
