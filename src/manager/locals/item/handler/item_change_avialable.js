const MySqlItemRepository = require("../infrastructure/mysql_item_repository");
const ItemChangeAvialable = require("../aplication/change_avialable/item_changer_avialable");

const Uuid = require("../../../../shared/domain/value/uuid");
const NoContentResponse = require("../../../../shared/domain/response/no_content_response");
const ErrorResponse = require("../../../../shared/domain/response/error_response");

exports.changeItemAvailable = async (event) => {
  const { pathParameters } = event;
  let response;
  try {
    const itemChangeAvialable = new ItemChangeAvialable(
      new MySqlItemRepository()
    );
    await itemChangeAvialable.call(new Uuid(pathParameters.id));
    response = new NoContentResponse();
  } catch (error) {
    response = new ErrorResponse(error);
  }
  return response.toJson();
};
