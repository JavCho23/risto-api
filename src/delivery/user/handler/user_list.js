const MySqlUserRepository = require("../infrastructure/mysql_user_repository");
const UserList = require("../aplication/list/user_lister");

const RawString = require("../../../shared/domain/value/raw_string");
const SuccessResponse = require("../../../shared/domain/response/success_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.addPersonal = async (event) => {
  const { pathParameters } = event;
  console.log(headers);
  let response;
  try {
    const userList = new UserList(new MySqlUserRepository());
    const body = await userList.call(new RawString(pathParameters.q));
    response = new SuccessResponse(body);
  } catch (error) {
    throw error;
    response = new ErrorResponse(error);
  }
  return response.toJson();
};
