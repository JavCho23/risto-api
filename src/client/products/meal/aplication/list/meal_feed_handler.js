const MealListFeed = require("./meal_list_feed");
const MysqlItemRepository = require("../../infrastructure/mysql_meal_repository");
const State = require("../../../../../shared/domain/state");
const SuccessResponse = require("../../../../../shared/domain/response/success_response")
const ErrorResponse = require("../../../../../shared/domain/response/error_response")
exports.feedItemsHandler = async event => {
    let response;
    try {
        const mealListFeed = new MealListFeed(new MysqlItemRepository());
        const data = await mealListFeed.call(new State(true));
        let body = data.map(item => item.toJson());
        response = new SuccessResponse(body);
    } catch (error) {
        response = new ErrorResponse(error);
    }
    return response.toJson();
};
