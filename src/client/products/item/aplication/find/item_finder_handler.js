const ItemFinder = require("./item_finder");
const MysqlItemRepository = require("../../infrastructure/mysql_item_repository");
const ItemId = require("../../domain/value/item_id");
const SuccessResponse = require("../../../../../shared/domain/response/success_response");
const ErrorResponse = require("../../../../../shared/domain/response/error_response");
const State = require("../../../../../shared/domain/state");

exports.mealFindHandler = async event => {
    const { pathParameters } = event;
    let response;
    try {
        const itemfinder = new ItemFinder(new MysqlItemRepository());
        let body = await itemfinder.call(
            new ItemId(pathParameters.id),
            new State(true)
        );
        response = new SuccessResponse(body.toJson());
    } catch (error) {
        response = new ErrorResponse(error);
    }
    return response.toJson();
};
