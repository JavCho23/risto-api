const db = require("../../../shared/domain/db");
const SearchResult = require("../domain/search_result");
const Utils = require("../../../shared/domain/utils");
const RawDouble = require("../../../shared/domain/value/raw_double");
const Uuid = require("../../../shared/domain/value/uuid");

const InvalidValue = require("../../../shared/domain/error/invalid_value_error");
class MySqlSearchRepository {
    async list(
        query,
        type,
        limit,
        offset,
        localFinder,
        itemFinder,
        productLister,
        tagLister,
        phoneLister,
        locationFinder,
        scheduleFinder,
        paymentsLister
    ) {
        let results;
        query = this.proceesQuery(query.value);

        switch (type) {
        case "local":
            results = await this.searchLocals(query);
            return await this.findLocalResults(
                Utils.paginate(results, limit.value, offset.value),
                localFinder,
                phoneLister,
                locationFinder,
                scheduleFinder,
                paymentsLister
            );
        case "item":
            results = await this.searchItems(query);
            return await this.findItemResults(
                Utils.paginate(results, limit.value, offset.value),
                itemFinder,
                productLister,
                tagLister
            );
        default:
            throw new InvalidValue();
        }
    }
    proceesQuery(query) {
        return query
            .split(" ")
            .map((word) => word + "*")
            .join(" ");
    }

    async searchItems(query) {
        const data = await db.doQuery(
            `SELECT item.id_item as idItem,  
      item.description,COUNT( product.id_product ) * 0.02 + MATCH (local.name) AGAINST ( ?  IN BOOLEAN MODE) * 0.01  + COUNT( tag.id_tag ) * 0.05 + MATCH (item.name , item.description) AGAINST ( ? IN BOOLEAN MODE) as score 
      FROM item 
      INNER JOIN tagger ON item.id_item = tagger.id_item
      LEFT JOIN ( SELECT name, id_tag FROM tag WHERE MATCH (tag.name) AGAINST ( ? IN BOOLEAN MODE) )tag ON tag.id_tag = tagger.id_tag
      LEFT JOIN ( SELECT name, id_product,id_item FROM product WHERE MATCH (name) AGAINST ( ? IN BOOLEAN MODE) )product ON product.id_item = item.id_item
      INNER JOIN catalog ON catalog.id_catalog = item.id_catalog
      INNER JOIN local ON local.id_local = catalog.id_local
      WHERE MATCH  (item.name,item.description) AGAINST ( ? IN BOOLEAN MODE)  
      GROUP BY item.id_item
      ORDER BY score DESC`,
            [query, query, query, query, query]
        );
        return data.map(
            (searchResult) =>
                new SearchResult(
                    new Uuid(searchResult.idItem),
                    new RawDouble(searchResult.score)
                )
        );
    }
    async searchLocals(query) {
        const data = await db.doQuery(
            `SELECT local.id_local as idLocal ,MATCH ( tag.name) AGAINST (? IN BOOLEAN MODE) * 0.01 + MATCH (local.name,local.description) AGAINST (? IN BOOLEAN MODE) + IF(local.delivery_price = 0,0.02,0) AS score 
      FROM local 
      INNER JOIN tag ON tag.id_tag = local.id_tag
      WHERE MATCH (local.name,local.description) AGAINST (? IN BOOLEAN MODE)  OR  MATCH (tag.name) AGAINST (? IN BOOLEAN MODE) 
      ORDER BY score DESC`,
            [query, query, query, query]
        );
        return data.map(
            (searchResult) =>
                new SearchResult(
                    new Uuid(searchResult.idLocal),
                    new RawDouble(searchResult.score)
                )
        );
    }
    async findItemResults(results, itemFinder, productLister, tagLister) {
        return await Promise.all(
            results.map(async (result) => {
                return await itemFinder.call(result.id, productLister, tagLister);
            })
        );
    }
    async findLocalResults(
        results,
        localFinder,
        phoneLister,
        locationFinder,
        scheduleFinder,
        paymentsLister
    ) {
        return Promise.all(
            results.map(async (result) => {
                return await localFinder.call(
                    result.id,
                    phoneLister,
                    locationFinder,
                    scheduleFinder,
                    paymentsLister
                );
            })
        );
    }
}

module.exports = MySqlSearchRepository;
