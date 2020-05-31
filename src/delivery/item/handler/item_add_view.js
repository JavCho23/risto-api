const MySqlItemRepository = require("../infrastructure/mysql_item_repository");
const ItemAdderView = require("../aplication/views/item_adder_view");

const Uuid = require("../../../shared/domain/value/uuid");
const NoContentResponse = require("../../../shared/domain/response/no_content_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.addItemView = async (event) => {
    const { pathParameters } = event;
    let response;
    try {
        const itemAdderView = new ItemAdderView(new MySqlItemRepository());
        await itemAdderView.call(new Uuid(pathParameters.id));
        response = new NoContentResponse();
    } catch (error) {
        response = new ErrorResponse(error);
    }
    return response.toJson();
};
