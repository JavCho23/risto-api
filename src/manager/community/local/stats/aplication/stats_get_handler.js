const MySqlCommunityStatsRepository = require("../infrastructure/mysql_community_stats_repository");
const SuccessResponse = require("../../../../../shared/domain/response/success_response");
const ErrorResponse = require("../../../../../shared/domain/response/error_response");

exports.statsGetHandler = async event => {
    const { pathParameters , queryStringParameters } = event;
    let response;
    try {
        const {type} = queryStringParameters ;
        const StatsGet = require("./"+type+"_stats_get");
        const qualificationGet = new StatsGet(new MySqlCommunityStatsRepository());
        const body = await qualificationGet.call(pathParameters.id);
        response = new SuccessResponse(body.toJson());
    } catch (error) {
        response = new ErrorResponse(error);
    }
    return response.toJson();
};
