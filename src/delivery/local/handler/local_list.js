const MySqlLocalRepository = require("../infrastructure/mysql_local_repository");
const MySqlLocationRepository = require("../../location/infrastructure/mysql_location_repository");
const LocationFinder = require("../../location/aplication/find/location_finder");
const MySqlPhoneRepository = require("../../phone/infrastructure/mysql_phone_repository");
const PhoneLister = require("../../phone/aplication/list/phone_lister");
const MySqlDayRepository = require("../../day/infrastructure/mysql_day_repository");
const ScheduleFinder = require("../../schedule/aplication/find/schedule_finder");
const MySqlPaymentRepository = require("../../payment/infrastructure/mysql_payment_repository");
const PaymentLister = require("../../payment/aplication/list_by_local/payment_lister_by_local");
const Uuid = require("../../../shared/domain/value/uuid");
const RawString = require("../../../shared/domain/value/raw_string");
const RawNumber = require("../../../shared/domain/value/raw_double");
const SuccessResponse = require("../../../shared/domain/response/success_response");
const ForbiddenError = require("../../../shared/domain/error/forbidden_error.js");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.listLocal = async (event) => {
  const { headers, queryStringParameters } = event;
  let response;
  try {
    const LocalLister = require("../aplication/list/local_lister_" +
      queryStringParameters.criteria);
    const localLister = new LocalLister(new MySqlLocalRepository());
    let body;
    switch (queryStringParameters.criteria) {
      case "near":
        const bodyRequest = JSON.parse(event.body);
        body = await localLister.call(
          bodyRequest,
          new RawNumber(queryStringParameters.limit),
          new RawNumber(queryStringParameters.offset),
          new PhoneLister(new MySqlPhoneRepository()),
          new LocationFinder(new MySqlLocationRepository()),
          new ScheduleFinder(new MySqlDayRepository()),
          new PaymentLister(new MySqlPaymentRepository())
        );
        break;

      case "favorites":
        if (!headers["Authorization"]) throw new ForbiddenError();
        const JWT = require("jsonwebtoken");
        body = await localLister.call(
          new RawString(JWT.decode(headers["Authorization"]).idUser),
          new RawNumber(queryStringParameters.limit),
          new RawNumber(queryStringParameters.offset),
          new PhoneLister(new MySqlPhoneRepository()),
          new LocationFinder(new MySqlLocationRepository()),
          new ScheduleFinder(new MySqlDayRepository()),
          new PaymentLister(new MySqlPaymentRepository())
        );
        break;
      case "popular":
        body = await localLister.call(
          new RawNumber(queryStringParameters.limit),
          new RawNumber(queryStringParameters.offset),
          new PhoneLister(new MySqlPhoneRepository()),
          new LocationFinder(new MySqlLocationRepository()),
          new ScheduleFinder(new MySqlDayRepository()),
          new PaymentLister(new MySqlPaymentRepository())
        );
        break;
    }
    response = new SuccessResponse(body.map((local) => local.toJson()));
  } catch (error) {
    response = new ErrorResponse(error);
  }
  return response.toJson();
};
