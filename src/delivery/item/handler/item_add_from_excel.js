const MySqlItemRepository = require("../infrastructure/mysql_item_repository");
const ItemAdder = require("../aplication/add/item_adder");
const MySqlProductRepository = require("../../product/infrastructure/mysql_product_repository");
const ProductAdder = require("../../product/aplication/add/product_adder");
const JWT = require("jsonwebtoken");

const Uuid = require("../../../shared/domain/value/uuid");
const CreatedResponse = require("../../../shared/domain/response/created_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.updateItem = async (event) => {
    const { pathParameters } = event;
    const bodyRequest = JSON.parse(event.body);

    let response;
    try {
        const itemAdder = new ItemAdder(new MySqlItemRepository());
        await itemAdder.call(
            new Uuid(pathParameters.id),
            bodyRequest.base64String,
            new ProductAdder(new MySqlProductRepository()),
            new RecordAdder(
                new Uuid(JWT.decode(headers["Authorization"]).idUser),
                new MySqlRecordRepository()
            )
        );
        response = new CreatedResponse();
    } catch (error) {
        throw error;
        response = new ErrorResponse(error);
    }
    return response.toJson();
};
