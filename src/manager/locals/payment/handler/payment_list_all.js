const MySqlPaymentRepository = require("../infrastructure/mysql_payment_repository");
const PaymentListerAll = require("../aplication/list_all/payment_lister_all");

const SuccessResponse = require("../../../../shared/domain/response/success_response");
const ErrorResponse = require("../../../../shared/domain/response/error_response");
exports.findPayment = async (event) => {
  let response;
  try {
    const paymentListerAll = new PaymentListerAll(new MySqlPaymentRepository());
    const body = await paymentListerAll.call();
    response = new SuccessResponse(body.toJson());
  } catch (error) {
    response = new ErrorResponse(error);
  }
  return response.toJson();
};
