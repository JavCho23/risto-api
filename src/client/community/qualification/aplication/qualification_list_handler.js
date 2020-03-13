const QualificationList = require("./qualification_list");
const MysqlQualificationRepository = require("../infrastructure/mysql_qualification_repository");
const MealId = require("../../../products/meal/domain/value/meal_id");
exports.qualificationListHandler = async event => {
    const { pathParameters } = event;
    const response = {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        isBase64Encoded: false
    };
    try {
        const qualificationList = new QualificationList(
            new MysqlQualificationRepository()
        );
        const data = await qualificationList.call(new MealId(pathParameters.id));

        const result = data.map( qualification =>{
            return qualification.toJson();
        });

        response.body = JSON.stringify(result);
    } catch (error) {
        response.statusCode = 404;
        response.body = JSON.stringify({ message: error.message });
    }

    return response;
};
