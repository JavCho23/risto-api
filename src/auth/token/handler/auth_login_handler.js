const Login = require("../aplication/login");
const keys = require("../infrastructure/persitence/securitykey.json");
const SuccessResponse = require("../../../shared/domain/response/success_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");
exports.authLoginHandler = async (event) => {
  const body = JSON.parse(event.body);
  let response;
  try {
    const login = new Login(body, keys.dev);
    const token = await login.call(body.aplication);
    response = new SuccessResponse({ token: token });
  } catch (error) {
    response = new ErrorResponse(error);
  }
  return response.toJson();
};
