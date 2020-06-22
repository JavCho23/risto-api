const MySqlItemRepository = require("../infrastructure/mysql_item_repository");
const ItemAdder = require("../aplication/add/item_adder");
const MySqlProductRepository = require("../../product/infrastructure/mysql_product_repository");
const ProductAdder = require("../../product/aplication/add/product_adder");
const RecordAdder = require("../../record/aplication/add/record_adder");
const MySqlRecordRepository = require("../../record/infrastructure/mysql_record_repository");
const JWT = require("jsonwebtoken");
const Uuid = require("../../../shared/domain/value/uuid");
const RawString = require("../../../shared/domain/value/raw_string");
const CreatedResponse = require("../../../shared/domain/response/created_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.addItem = async (event) => {
    const { pathParameters, headers } = event;
    const bodyRequest = JSON.parse(event.body);

    let response;
    try {
        const itemAdder = new ItemAdder(new MySqlItemRepository());
        await itemAdder.call(
            new Uuid(pathParameters.id),
            bodyRequest,
            new ProductAdder(new MySqlProductRepository()),
            new RecordAdder(
                new RawString(JWT.decode(headers["Authorization"]).idUser),
                new MySqlRecordRepository()
            )
        );
        response = new CreatedResponse();
    } catch (error) {
        
        response = new ErrorResponse(error);
    }
    return response.toJson();
};
