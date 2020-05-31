const MySqlLocalRepository = require("../infrastructure/mysql_local_repository");
const LocalRemove = require("../aplication/remove/local_remover");

const Uuid = require("../../../shared/domain/value/uuid");
const NoContentReponse = require("../../../shared/domain/response/no_content_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.removeLocal = async (event) => {
    const { pathParameters } = event;
    let response;
    try {
        const localRemove = new LocalRemove(new MySqlLocalRepository());
        await localRemove.call(new Uuid(pathParameters.id));
        response = new NoContentReponse();
    } catch (error) {
        response = new ErrorResponse(error);
    }
    return response.toJson();
};
