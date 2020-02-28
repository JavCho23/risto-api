const MealFinder = require("./meal_finder");
const MysqlMealRepository = require("../../infrastructure/mysql_meal_repository");
const MealId = require("../../domain/value/meal_id");
const State = require("../../../../../shared/domain/state");
exports.itemFindHandler = async event => {
  const { pathParameters } = event;
  const response = {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    isBase64Encoded: false
  };
  try {
    const mealfinder = new MealFinder(new MysqlMealRepository());
    let result = await mealfinder.call(
      new MealId(pathParameters.id),
      new State(true)
    );
    response.body = JSON.stringify({
      result: result,
      status: true
    });
  } catch (error) {
    response.body = JSON.stringify({
      result: error.toString(),
      status: false
    });
  }
  return response;
};
