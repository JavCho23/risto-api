const MySqlUserRepository = require("../infrastructure/mysql_user_repository");
const UserFollow = require("../aplication/follow/user_is_follow");
const Uuid = require("../../../shared/domain/value/uuid");
const SuccessResponse = require("../../../shared/domain/response/success_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");
const JWT = require("jsonwebtoken");

exports.idFollowing = async (event) => {
  const { pathParameters, headers } = event;
  console.log(headers);
  let response;
  try {
    const userFollow = new UserFollow(new MySqlUserRepository());
    const body = await userFollow.call(
      new Uuid(pathParameters.id),
      new Uuid(JWT.decode(headers["Authorization"]).idUser)
    );
    response = new SuccessResponse(body);
  } catch (error) {
    throw error;
    response = new ErrorResponse(error);
  }
  return response.toJson();
};
