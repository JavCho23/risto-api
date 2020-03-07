const MealFinder = require("./meal_finder");
const MysqlMealRepository = require("../../infrastructure/mysql_meal_repository");
const MealId = require("../../domain/value/meal_id");
const State = require("../../../../../shared/domain/state");
exports.mealFindHandler = async event => {
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
      result: result.toJson(),
    });
  } catch (error) {
    response.statusCode = 400;
    response.body = JSON.stringify({
      result: error.toString(),
    });
  }
  return response;
};
