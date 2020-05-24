const MySqlLocalRepository = require("../infrastructure/mysql_local_repository");
const LocalLister = require("../aplication/list/local_lister_by_signature");
const MySqlLocationRepository = require("../../location/infrastructure/mysql_location_repository");
const LocationFinder = require("../../location/aplication/find/location_finder");
const MySqlPhoneRepository = require("../../phone/infrastructure/mysql_phone_repository");
const PhoneLister = require("../../phone/aplication/list/phone_lister");
const MySqlDayRepository = require("../../day/infrastructure/mysql_day_repository");
const ScheduleFinder = require("../../schedule/aplication/find/schedule_finder");
const MySqlPaymentRepository = require("../../payment/infrastructure/mysql_payment_repository");
const PaymentLister = require("../../payment/aplication/list_by_local/payment_lister_by_local");
const Uuid = require("../../../shared/domain/value/uuid");
const SuccessResponse = require("../../../shared/domain/response/success_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.listLocalBySignature = async (event) => {
  const { pathParameters } = event;
  let response;
  try {
    const localLister = new LocalLister(new MySqlLocalRepository());
    const body = await localLister.call(
      new Uuid(pathParameters.id),
      new PhoneLister(new MySqlPhoneRepository()),
      new LocationFinder(new MySqlLocationRepository()),
      new ScheduleFinder(new MySqlDayRepository()),
      new PaymentLister(new MySqlPaymentRepository())
    );
    response = new SuccessResponse(body.map(local => local.toJson()));
  } catch (error) {
    response = new ErrorResponse(error);
  }
  return response.toJson();
};
