const MySqlItemRepository = require("../infrastructure/mysql_item_repository");
const ItemGetterViews = require("../aplication/views/item_getter_views");

const Uuid = require("../../../shared/domain/value/uuid");
const SuccessResponse = require("../../../shared/domain/response/success_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.getItemViews = async (event) => {
    const { pathParameters } = event;
    let response;
    try {
        const itemGetterViews = new ItemGetterViews(new MySqlItemRepository());
        const body = await itemGetterViews.call(new Uuid(pathParameters.id));
        response = new SuccessResponse({ total: body.value });
    } catch (error) {
        response = new ErrorResponse(error);
    }
    return response.toJson();
};
