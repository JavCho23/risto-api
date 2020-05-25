const MySqlItemRepository = require("../infrastructure/mysql_item_repository");
const ItemAdder = require("../aplication/add/item_adder");
const MySqlProductRepository = require("../../product/infrastructure/mysql_product_repository");
const ProductAdder = require("../../product/aplication/add/product_adder");

const Uuid = require("../../../shared/domain/value/uuid");
const CreatedResponse = require("../../../shared/domain/response/created_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.addItem = async (event) => {
  const { pathParameters } = event;
  const bodyRequest = JSON.parse(event.body);

  let response;
  try {
    const itemAdder = new ItemAdder(new MySqlItemRepository());
    await itemAdder.call(
      new Uuid(pathParameters.id),
      bodyRequest,
      new ProductAdder(new MySqlProductRepository())
    );
    response = new CreatedResponse();
  } catch (error) {
    throw error;
    response = new ErrorResponse(error);
  }
  return response.toJson();
};
