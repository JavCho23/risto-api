const MySqlPaymentRepository = require("../infrastructure/mysql_payment_repository");
const PaymentLister = require("../aplication/list_by_local/payment_lister_by_local");
const Uuid = require("../../../shared/domain/value/uuid");
const SuccessResponse = require("../../../shared/domain/response/success_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");
exports.listByLocal = async (event) => {
    const { pathParameters } = event;
    let response;
    try {
        const paymentLister = new PaymentLister(new MySqlPaymentRepository());
        const body = await paymentLister.call(new Uuid(pathParameters.id));
        response = new SuccessResponse(body.map((payment) => payment.toJson()));
    } catch (error) {
        response = new ErrorResponse(error);
    }
    return response.toJson();
};
