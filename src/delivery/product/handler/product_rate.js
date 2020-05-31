const MySqlProductRepository = require("../infrastructure/mysql_product_repository");
const ProductRater = require("../aplication/rate/product_rater");
const MySqlItemRepository = require("../../item/infrastructure/mysql_item_repository");
const ItemRateCalculater = require("../../item/aplication/rate/item_rate_calculater");
const JWT = require('jsonwebtoken');

const Uuid = require("../../../shared/domain/value/uuid");
const RawNumber = require("../../../shared/domain/value/raw_double");
const NoContentResponse = require("../../../shared/domain/response/no_content_response");
const InvalidValueError = require("../../../shared/domain/error/invalid_value_error");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.rateProduct = async (event) => {
  const { queryStringParameters, headers } = event;
  const bodyResquest = JSON.parse(event.body);
  let response;
  try {
    if (queryStringParameters.of != "product") throw new InvalidValueError();
    const productRater = new ProductRater(new MySqlProductRepository());
    await productRater.call(
      new Uuid(bodyResquest.idProduct),
      new Uuid(JWT.decode(headers["Authorization"]).idUser),
      new RawNumber(bodyResquest.score),
      new ItemRateCalculater(new MySqlItemRepository())
    );
    response = new NoContentResponse();
  } catch (error) {
    response = new ErrorResponse(error);
  }
  return response.toJson();
};
