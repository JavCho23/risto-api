const MySqlPersonalRepository = require("../infrastructure/mysql_personal_repository");
const PersonalRemover = require("../aplication/remove/personal_remover");
const Uuid = require("../../../shared/domain/value/uuid");
const NoContentResponse = require("../../../shared/domain/response/no_content_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.removePersonal = async (event) => {
    const { pathParameters } = event;
    let response;
    try {
        const personalRemover = new PersonalRemover(new MySqlPersonalRepository());
        await personalRemover.call(new Uuid(pathParameters.idPersonal));
        response = new NoContentResponse();
    } catch (error) {
        response = new ErrorResponse(error);
    }
    return response.toJson();
};
