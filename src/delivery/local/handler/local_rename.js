const MySqlLocalRepository = require("../infrastructure/mysql_local_repository");
const LocalRenamer = require("../aplication/rename/local_renamer");

const Uuid = require("../../../shared/domain/value/uuid");
const RawString = require("../../../shared/domain/value/raw_string");
const NoContentReponse = require("../../../shared/domain/response/no_content_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.renameLocal = async (event) => {
    const bodyRequest = JSON.parse(event.body);
    const { pathParameters } = event;
    let response;
    try {
        const localRenamer = new LocalRenamer(new MySqlLocalRepository());
        await localRenamer.call(
            new Uuid(pathParameters.id),
            new RawString(bodyRequest.name)
        );
        response = new NoContentReponse();
    } catch (error) {
        response = new ErrorResponse(error);
    }
    return response.toJson();
};
