const MySqlProfileRepository = require("../infrastructure/mysql_profile_repository");
const ProfileRemover = require("../aplication/remove/profile_remover");

const Uuid = require("../../../shared/domain/value/uuid");
const NoContentReponse = require("../../../shared/domain/response/no_content_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.removeProfile = async (event) => {
    const { pathParameters } = event;
    let response;
    try {
        const profileRemover = new ProfileRemove(new MySqlProfileRepository());
        await profileRemover.call(new Uuid(pathParameters.id));
        response = new NoContentReponse();
    } catch (error) {
        response = new ErrorResponse(error);
    }
    return response.toJson();
};
