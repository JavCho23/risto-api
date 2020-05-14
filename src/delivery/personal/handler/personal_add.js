const MySqlPersonalRepository = require("../infrastructure/mysql_personal_repository");
const PersonalAdder = require("../aplication/add/personal_adder");
const Uuid = require("../../../shared/domain/value/uuid");
const CreatedResponse = require("../../../shared/domain/response/created_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.addPersonal = async (event) => {
  const { pathParameters } = event;
  const bodyRequest = JSON.parse(event.body);
  let response;
  try {
    const personalAdder = new PersonalAdder(new MySqlPersonalRepository());
    await personalAdder.call(
      new Uuid(pathParameters.id),
      new Uuid(bodyRequest.idManager),
      new Uuid(bodyRequest.idUser)
    );
    response = new CreatedResponse();
  } catch (error) {
    throw error;
    response = new ErrorResponse(error);
  }
  return response.toJson();
};
