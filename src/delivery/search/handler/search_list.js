const MySqlSearchRepository = require("../infrastructure/mysql_search_repository");
const SearchLister = require("../aplication/list/search_lister");
const MySqlLocationRepository = require("../../location/infrastructure/mysql_location_repository");
const LocationFinder = require("../../location/aplication/find/location_finder");
const MySqlPhoneRepository = require("../../phone/infrastructure/mysql_phone_repository");
const PhoneLister = require("../../phone/aplication/list/phone_lister");
const MySqlDayRepository = require("../../day/infrastructure/mysql_day_repository");
const ScheduleFinder = require("../../schedule/aplication/find/schedule_finder");
const MySqlPaymentRepository = require("../../payment/infrastructure/mysql_payment_repository");
const PaymentLister = require("../../payment/aplication/list_by_local/payment_lister_by_local");
const MySqlProductRepository = require("../../product/infrastructure/mysql_product_repository");
const ProductLister = require("../../product/aplication/list/product_lister");
const MySqlTagRepository = require("../../tag/infrastructure/mysql_tag_repository");
const TagLister = require("../../tag/aplication/list/tag_lister");
const MySqlItemRepository = require("../../item/infrastructure/mysql_item_repository");
const ItemFinder = require("../../item/aplication/find/item_finder");
const MySqlLocalRepository = require("../../local/infrastructure/mysql_local_repository");
const LocalFinder = require("../../local/aplication/find/local_finder");
const RawString = require("../../../shared/domain/value/raw_string");
const RawNumber = require("../../../shared/domain/value/raw_double");

const SuccessResponse = require("../../../shared/domain/response/success_response");
const ErrorResponse = require("../../../shared/domain/response/error_response");

exports.search = async (event) => {
    const { queryStringParameters } = event;
    let response;
    try {
        const searchLister = new SearchLister(new MySqlSearchRepository());
        const body = await searchLister.call(
            new RawString(queryStringParameters.q),
            queryStringParameters.type,
            new RawNumber(queryStringParameters.limit + queryStringParameters.offset),
            new RawNumber(queryStringParameters.offset),
            new LocalFinder(new MySqlLocalRepository()),
            new ItemFinder(new MySqlItemRepository()),
            new ProductLister(new MySqlProductRepository()),
            new TagLister(new MySqlTagRepository()),
            new PhoneLister(new MySqlPhoneRepository()),
            new LocationFinder(new MySqlLocationRepository()),
            new ScheduleFinder(new MySqlDayRepository()),
            new PaymentLister(new MySqlPaymentRepository())
        );
        response = new SuccessResponse(body.map((result) => result.toJson()));
    } catch (error) {
        response = new ErrorResponse(error);
    }
    return response.toJson();
};
