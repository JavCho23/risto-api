const MySqlLocalRepository = require("../infrastructure/mysql_profile_repository");
const LocalLister = require("../aplication/list/profile_lister_by_user");
const MySqlLocationRepository = require("../../location/infrastructure/mysql_location_repository");
const LocationFinder = require("../../location/aplication/find/location_finder");
const JWT = require("jsonwebtoken");

const Uuid = require("../../../shared/domain/value/uuid");
const SuccessResponse = require("../../../shared/domain/response/success_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.listProfilesByUser = async (event) => {
  const { pathParameters } = event;
  let response;
  try {
    const localLister = new LocalLister(new MySqlLocalRepository());
    const body = await localLister.call(
      new Uuid(JWT.decode(headers["x-api-key"]).idUser),
      new LocationFinder(new MySqlLocationRepository())
    );
    response = new SuccessResponse(body.map(local => local.toJson()));
  } catch (error) {
    response = new ErrorResponse(error);
  }
  return response.toJson();
};
