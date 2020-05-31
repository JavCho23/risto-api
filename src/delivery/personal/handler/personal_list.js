const MySqlPersonalRepository = require("../infrastructure/mysql_personal_repository");
const PersonalLister = require("../aplication/list/personal_lister");
const Uuid = require("../../../shared/domain/value/uuid");
const SuccessResponde = require("../../../shared/domain/response/success_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.listPersonal = async (event) => {
    const { pathParameters } = event;
    let response;
    try {
        const personalLister = new PersonalLister(new MySqlPersonalRepository());
        const body = await personalLister.call(new Uuid(pathParameters.id));
        response = new SuccessResponde(body.map((manager) => manager.toJson()));
    } catch (error) {
        response = new ErrorResponse(error);
    }
    return response.toJson();
};
