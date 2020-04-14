const Lister = require("./ask_lister");
const MySqlAskRepository = require("../../infrastructure/mysql_ask_repository");
const SuccessResponse = require("../../../../../shared/domain/response/success_response");
const ErrorResponse = require("../../../../../shared/domain/response/error_response");
exports.askListHandler = async event => {
    const { pathParameters } = event;
    let response;
    try {
        const lister = new Lister(new MySqlAskRepository());
        let result = await lister.call(pathParameters.id);
        response = new SuccessResponse(result.map((ask)=> ask.toJson()));
    } catch (error) {
        response = new ErrorResponse(error);
    }
    return response.toJson();
};
