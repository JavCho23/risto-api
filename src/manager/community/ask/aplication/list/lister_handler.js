const Lister = require("./lister");
const MySqlAskRepository = require("../../infrastructure/mysql_ask_repository");
//const LocalId = require("../../domain/value/meal_id");

exports.askListHandler = async event => {
    const { pathParameters } = event;
    const response = {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        isBase64Encoded: false
    };
    try {
        const lister = new Lister(new MySqlAskRepository());
        let result = await lister.call(pathParameters.id);
        response.body = JSON.stringify(result.map((ask)=> ask.toJson()));
    } catch (error) {
        response.statusCode = 404;
        response.body = JSON.stringify({ message: error.message });
    }
    return response;
};
