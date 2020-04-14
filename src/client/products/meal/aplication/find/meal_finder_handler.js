const MealFinder = require("./meal_finder");
const MysqlMealRepository = require("../../infrastructure/mysql_meal_repository");
const MealId = require("../../domain/value/meal_id");
const SuccessResponse = require("../../../../../shared/domain/response/success_response");
const ErrorResponse = require("../../../../../shared/domain/response/error_response");
const State = require("../../../../../shared/domain/state");
exports.mealFindHandler = async event => {
    const { pathParameters } = event;
    let response;
    try {
        const mealfinder = new MealFinder(new MysqlMealRepository());
        let body = await mealfinder.call(
            new MealId(pathParameters.id),
            new State(true)
        );
        response = new SuccessResponse(body.toJson());
    } catch (error) {
        response = new ErrorResponse(error);
    }
    return response.toJson();
};
