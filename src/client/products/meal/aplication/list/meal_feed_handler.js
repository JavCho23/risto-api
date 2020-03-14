const MealListFeed = require("./meal_list_feed");
const MysqlItemRepository = require("../../infrastructure/mysql_meal_repository");
const State = require("../../../../../shared/domain/state");
exports.feedItemsHandler = async event => {
    const response = {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        isBase64Encoded: false
    };
    try {
        const mealListFeed = new MealListFeed(new MysqlItemRepository());
        const data = await mealListFeed.call(new State(true));
        let result = data.map(item => item.toJson());
        response.body = JSON.stringify(result);
    } catch (error) {
        response.statusCode = 404;
        response.body = JSON.stringify({ message: error.message });
    }

    return response;
};
