const QualificationsList = require("./qualifications_list");
const MySqlQualificationsRepository = require("../infrastructure/mysql_qualifications_repository");
const MealId = require("../../../products/meal/domain/value/meal_id");
exports.qualificationListHandler = async event => {
    const { pathParameters } = event;
    const response = {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        isBase64Encoded: false
    };
    try {
        const qualificationsList = new QualificationsList(
            new MySqlQualificationsRepository()
        );
        const data = await qualificationsList.call(new MealId(pathParameters.id));
                const result = data.toJson(); 
        response.body = JSON.stringify(result);
    } catch (error) {
        response.statusCode = 404;
        response.body = JSON.stringify({ message: error.message });
    }

    return response;
};
