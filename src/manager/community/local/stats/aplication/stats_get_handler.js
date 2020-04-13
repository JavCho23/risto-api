const MySqlCommunityStatsRepository = require("../infrastructure/mysql_community_stats_repository");

exports.statsGetHandler = async event => {
    const { pathParameters , queryStringParameters } = event;
    const response = {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        isBase64Encoded: false
    };
    try {
        const {type} = queryStringParameters ;
        const StatsGet = require("./"+type+"_stats_get");
        const qualificationGet = new StatsGet(new MySqlCommunityStatsRepository())
        const data = await qualificationGet.call(pathParameters.id);
        const result = data.toJson(); 
        response.body = JSON.stringify(result);
       
    } catch (error) {
        response.statusCode = 404;
        response.body = JSON.stringify({ message: error.message });
    }

    return response;
};
