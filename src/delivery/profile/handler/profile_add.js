const MySqlProfileRepository = require("../infrastructure/mysql_profile_repository");
const ProfileAdder = require("../aplication/add/profile_adder");
const MySqlLocationRepository = require("../../location/infrastructure/mysql_location_repository");
const LocationAdder = require("../../location/aplication/add/location_adder");
const JWT = require("jsonwebtoken");

const NoContentReponse = require("../../../shared/domain/response/no_content_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.addProfile = async (event) => {
  const { headers } = event;
  const bodyRequest = JSON.parse(event.body);
  let response;
  try {
    const profileAdder = new ProfileAdder(new MySqlProfileRepository());
    await profileAdder.call(
      new Uuid(JWT.decode(headers["x-api-key"]).idUser),
      bodyRequest ,
      new LocationAdder(new MySqlLocationRepository())
    );
    response = new NoContentReponse();
  } catch (error) {
    throw error;
    response = new ErrorResponse(error);
  }
  return response.toJson();
};
