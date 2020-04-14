const QualificationsList = require("./qualifications_list");
const MySqlQualificationsRepository = require("../infrastructure/mysql_qualifications_repository");
const SuccessResponse = require("../../../../shared/domain/response/success_response");
const ErrorResponse = require("../../../../shared/domain/response/error_response");
const MealId = require("../../../products/meal/domain/value/meal_id");
exports.qualificationListHandler = async event => {
    const { pathParameters } = event;
    let response;
    try {
        const qualificationsList = new QualificationsList(
            new MySqlQualificationsRepository()
        );
        const data = await qualificationsList.call(new MealId(pathParameters.id));
        const body = data.toJson(); 
        response = new SuccessResponse(body);
    } catch (error) {
        response = new ErrorResponse(error);
    }
    return response.toJson();
};
