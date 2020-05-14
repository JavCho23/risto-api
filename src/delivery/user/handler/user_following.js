const MySqlUserRepository = require("../infrastructure/mysql_user_repository");
const UserFollow = require("../aplication/follow/user_follow");
const Uuid = require("../../../shared/domain/value/uuid");
const NoContentReponse = require("../../../shared/domain/response/no_content_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");
const JWT = require("jsonwebtoken");

exports.addPersonal = async (event) => {
  const { pathParameters, headers } = event;
  const bodyRequest = JSON.parse(event.body);
  console.log(headers);
  let response;
  try {
    const userFollow = new UserFollow(new MySqlUserRepository());
    await userFollow.call(
      new Uuid(pathParameters.id),
      new Uuid(JWT.decode(headers["x-api-key"]).idUser)
    );
    response = new NoContentReponse();
  } catch (error) {
    throw error;
    response = new ErrorResponse(error);
  }
  return response.toJson();
};
