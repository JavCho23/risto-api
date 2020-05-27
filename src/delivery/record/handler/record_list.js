const MySqlRecordRepository = require("../infrastructure/mysql_record_repository");
const RecordLister = require("../aplication/list/record_lister");
const Uuid = require("../../../shared/domain/value/uuid");
const RawDouble = require("../../../shared/domain/value/raw_double");
const SuccessResponse = require("../../../shared/domain/response/success_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.listRecord = async (event) => {
  const { pathParameters, queryStringParameters } = event;
  let response;
  try {
    const recordLister = new RecordLister(new MySqlRecordRepository());
    const body = await recordLister.call(
      new Uuid(pathParameters.id),
      new RawDouble(queryStringParameters.days)
    );
    response = new SuccessResponse(body.map((record) => record.toJson()));
  } catch (error) {
    response = new ErrorResponse(error);
  }
  return response.toJson();
};
