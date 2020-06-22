const MySqlUserRepository = require("../infrastructure/mysql_user_repository");
const UserFollow = require("../aplication/follow/user_is_follow");
const Uuid = require("../../../shared/domain/value/uuid");
const ErrorResponse = require("../../../shared/domain/response/error_response");
const JWT = require("jsonwebtoken");
const RawString = require("../../../shared/domain/value/raw_string");
const NoContentResponse = require("../../../shared/domain/response/no_content_response");

exports.isFollowing = async (event) => {
  const { pathParameters, headers } = event;
  console.log(headers);
  let response;
  try {
    const userFollow = new UserFollow(new MySqlUserRepository());
    await userFollow.call(
      new Uuid(pathParameters.id),
      new RawString(JWT.decode(headers["Authorization"]).idUser)
    );
    response = new NoContentResponse();
  } catch (error) {
    response = new ErrorResponse(error);
  }
  return response.toJson();
};
