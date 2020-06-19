const MySqlLocalRepository = require("../infrastructure/mysql_local_repository");
const LocalGetterDeliveryPrice = require("../aplication/find/local_getter_delivery_price");
const MySqlPaymentRepository = require("../../payment/infrastructure/mysql_payment_repository");
const PaymentLister = require("../../payment/aplication/list_by_local/payment_lister_by_local");
const Uuid = require("../../../shared/domain/value/uuid");
const SuccessResponse = require("../../../shared/domain/response/success_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.getLocalDeliveryData = async (event) => {
  const { pathParameters } = event;
  let response;
  try {
    const localGetterDeliveryPrice = new LocalGetterDeliveryPrice(
      new MySqlLocalRepository()
    );
    const body = await localGetterDeliveryPrice.call(
      new Uuid(pathParameters.id),
      new PaymentLister(new MySqlPaymentRepository())
    );
    response = new SuccessResponse(body);
  } catch (error) {
    response = new ErrorResponse(error);
  }
  return response.toJson();
};
