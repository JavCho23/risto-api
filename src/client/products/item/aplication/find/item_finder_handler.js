const ItemFinder = require("./item_finder");
const MysqlItemRepository = require("../../infrastructure/mysql_item_repository");
const ItemId = require("../../domain/value/item_id");

exports.findItemHandler = async event => {
  const { pathParameters } = event;
  try {
    const itemfinder = new ItemFinder(new MysqlItemRepository());
    const result = itemfinder.call(new ItemId(pathParameters.id));

    result = result.length == 0 ? "No se ha encontrado el item." : result;
    const status = result.length == 0 ? false : true;

    const bodyResponse = {
      result: result,
      status: status
    };
    console.log(bodyResponse);
    const response = {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyResponse),
      isBase64Encoded: false
    };
    return response;
  } catch (error) {
    console.log(error);
  }
};
