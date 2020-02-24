const ItemList = require("./item_list");
const MysqlItemRepository = require("../../infrastructure/mysql_item_repository");

exports.listItemsHandler = async event => {
  try {
    const itemlist = new ItemList(new MysqlItemRepository());
    let result = await itemlist.call();

    result = result.length == 0 ? "No se han encontrado items." : result;
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
