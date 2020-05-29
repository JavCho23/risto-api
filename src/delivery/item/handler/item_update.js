const MySqlItemRepository = require("../infrastructure/mysql_item_repository");
const ItemUpdater = require("../aplication/update/item_updater");
const MySqlProductRepository = require("../../product/infrastructure/mysql_product_repository");
const ProductLister = require("../../product/aplication/list/product_lister");
const ProductAdder = require("../../product/aplication/add/product_adder");
const ProductRemover = require("../../product/aplication/remove/product_remover");
const ProductUpdater = require("../../product/aplication/update/product_updater");
const MySqlTagRepository = require("../../tag/infrastructure/mysql_tag_repository");
const TagLister = require("../../tag/aplication/list/tag_lister");
const RecordAdder = require("../../record/aplication/add/record_adder");
const MySqlRecordRepository = require("../../record/infrastructure/mysql_record_repository");

const JWT = require("jsonwebtoken");
const Uuid = require("../../../shared/domain/value/uuid");
const NoContentResponse = require("../../../shared/domain/response/no_content_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.updateItem = async (event) => {
  const { pathParameters, headers } = event;
  const bodyRequest = JSON.parse(event.body);

  let response;
  try {
    const itemUpdater = new ItemUpdater(new MySqlItemRepository());
    await itemUpdater.call(
      { ...bodyRequest, ...{ idItem: pathParameters.id } },
      new ProductLister(new MySqlProductRepository()),
      new TagLister(new MySqlTagRepository()),
      new ProductUpdater(new MySqlProductRepository()),
      new ProductAdder(new MySqlProductRepository()),
      new ProductRemover(new MySqlProductRepository()),
      new RecordAdder(
        new Uuid(JWT.decode(headers["x-api-key"]).idUser),
        new MySqlRecordRepository()
      )
    );

    response = new NoContentResponse();
  } catch (error) {
    throw error;
    response = new ErrorResponse(error);
  }
  return response.toJson();
};
