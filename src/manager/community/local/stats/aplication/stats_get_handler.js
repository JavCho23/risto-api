const CommunityStatsGet = require("./community_stats_get");
const MySqlCommunityStatsRepository = require("../infrastructure/mysql_community_stats_repository");

exports.statsGetHandler = async event => {
    const { pathParameters , queryStringParameters } = event;
    const response = {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        isBase64Encoded: false
    };
    try {
       if(queryStringParameters.type == "community"){
        const qualificationGet = new CommunityStatsGet(
            new MySqlCommunityStatsRepository()
        );
        const data = await qualificationGet.call(pathParameters.id);
        const result = data.toJson(); 
        response.body = JSON.stringify(result);
       }
    } catch (error) {
        response.statusCode = 404;
        response.body = JSON.stringify({ message: error.message });
    }

    return response;
};
