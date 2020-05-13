const MySqlItemRepository = require("../infrastructure/mysql_item_repository");
const ItemLister = require("../aplication/list/item_lister_By_Local");
const MySqlProductRepository = require("../../product/infrastructure/mysql_product_repository");
const ProductLister = require("../../product/aplication/list/product_lister");
const MySqlTagRepository = require("../../tag/infrastructure/mysql_tag_repository");
const TagLister = require("../../tag/aplication/list/tag_lister");

const Uuid = require("../../../shared/domain/value/uuid");
const RawNumber = require("../../../shared/domain/value/raw_double");
const SuccessResponse = require("../../../shared/domain/response/success_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.listItemsByLocal = async (event) => {
  const { pathParameters, queryStringParameters } = event;
  let response;
  try {
    const itemLister = new ItemLister(new MySqlItemRepository());
    const body = await itemLister.call(
      new Uuid(pathParameters.id),
      new RawNumber(queryStringParameters.limit),
      new RawNumber(queryStringParameters.offset),
      new ProductLister(new MySqlProductRepository()),
      new TagLister(new MySqlTagRepository())
    );
    response = new SuccessResponse(body.map((item) => item.toJson()));
  } catch (error) {
    response = new ErrorResponse(error);
  }
  return response.toJson();
};
