const MySqlItemRepository = require("../infrastructure/mysql_item_repository");
const ItemRemover = require("../aplication/remove/item_remover");
const JWT = require("jsonwebtoken");

const Uuid = require("../../../shared/domain/value/uuid");
const NoContentResponse = require("../../../shared/domain/response/no_content_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.removeItem = async (event) => {
    const { pathParameters } = event;
    let response;
    try {
        const itemRemover = new ItemRemover(new MySqlItemRepository());
        await itemRemover.call(new Uuid(pathParameters.id), new RecordAdder(
            new Uuid(JWT.decode(headers["Authorization"]).idUser),
            new MySqlRecordRepository()
        ));
        response = new NoContentResponse();
    } catch (error) {
        response = new ErrorResponse(error);
    }
    return response.toJson();
};
