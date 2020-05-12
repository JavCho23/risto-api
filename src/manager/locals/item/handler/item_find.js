const MySqlItemRepository = require("../infrastructure/mysql_item_repository");
const ItemFinder = require("../aplication/find/item_finder");
const MySqlProductRepository = require("../../product/infrastructure/mysql_product_repository");
const ProductLister = require("../../product/aplication/list/product_lister");
const MySqlTagRepository = require("../../tag/infrastructure/mysql_tag_repository");
const TagLister = require("../../tag/aplication/list/tag_lister");

const Uuid = require("../../../../shared/domain/value/uuid");
const SuccessResponse = require("../../../../shared/domain/response/success_response");
const ErrorResponse = require("../../../../shared/domain/response/error_response");

exports.findItem = async (event) => {
  const { pathParameters } = event;
  let response;
  try {
    const itemFinder = new ItemFinder(new MySqlItemRepository());
    const body = await itemFinder.call(
      new Uuid(pathParameters.id),
      new ProductLister(new MySqlProductRepository()),
      new TagLister(new MySqlTagRepository())
    );
    response = new SuccessResponse(body.toJson());
  } catch (error) {
    response = new ErrorResponse(error);
  }
  return response.toJson();
};
