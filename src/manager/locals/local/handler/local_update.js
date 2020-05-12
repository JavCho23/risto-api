const MySqlLocalRepository = require("../infrastructure/mysql_local_repository");
const LocalUpdater = require("../aplication/update/local_updater");
const MySqlLocationRepository = require("../../location/infrastructure/mysql_location_repository");
const LocationUpdater = require("../../location/aplication/update/location_updater");
const MySqlPhoneRepository = require("../../phone/infrastructure/mysql_phone_repository");
const PhoneLister = require("../../phone/aplication/list/phone_lister");
const PhoneAdder = require("../../phone/aplication/add/phone_adder");
const PhoneRemover = require("../../phone/aplication/remove/phone_remover");
const PhoneUpdater = require("../../phone/aplication/update/phone_updater");
const MySqlDayRepository = require("../../day/infrastructure/mysql_day_repository");
const ScheduleUpdater = require("../../schedule/aplication/update/schedule_updater");
const MySqlPaymentRepository = require("../../payment/infrastructure/mysql_payment_repository");
const PaymentLister = require("../../payment/aplication/list_by_local/payment_lister_by_local");
const NoContentReponse = require("../../../../shared/domain/response/no_content_response");
const ErrorResponse = require("../../../../shared/domain/response/error_response");

exports.updateLocal = async (event) => {
  const { pathParameters } = event;
  const bodyRequest = JSON.parse(event.body);
  let response;
  try {
    const localUpdater = new LocalUpdater(new MySqlLocalRepository());
    await localUpdater.call(
      { ...bodyRequest, ...{ idLocal: pathParameters.id } },
      new PhoneLister(new MySqlPhoneRepository()),
      new PaymentLister(new MySqlPaymentRepository()),
      new LocationUpdater(new MySqlLocationRepository()),
      new ScheduleUpdater(new MySqlDayRepository()),
      new PhoneUpdater(new MySqlPhoneRepository()),
      new PhoneAdder(new MySqlPhoneRepository()),
      new PhoneRemover(new MySqlPhoneRepository())
    );
    response = new NoContentReponse();
  } catch (error) {
    throw error;
    response = new ErrorResponse(error);
  }
  return response.toJson();
};
