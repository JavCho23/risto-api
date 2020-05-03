const Item = require("../../domain/item");
const ItemId = require("../../domain/value/item_id");
const ItemName = require("../../domain/value/item_name");
const LocalName = require("../../../../shared/domain/local/value/local_name");
const ItemPrice = require("../../domain/value/item_price");
const ItemDescription = require("../../domain/value/item_description");

const GetScore = require("../get_score/get_score");

class FillItem {
    constructor(dataItem, tagGetCatagory, tagListTags) {
        this._dataItem = dataItem;
        this._tagGetCategory = tagGetCatagory;
        this._tagListTags = tagListTags;
        this.itemId = new ItemId(this._dataItem.id_item);
    }
    async call() {
        const getScore = new GetScore(this.itemId);
        this._score = getScore.call();
        this._tags = await this._tagListTags.call(this.itemId);
        this._category = await this._tagGetCategory.call(this.itemId);
        return new Item(
            this.itemId,
            new ItemName(this._dataItem.name),
            new LocalName(this._dataItem.localName),
            new ItemPrice(this._dataItem.price),
            new ItemDescription(this._dataItem.description),
            this._category[0],
            this._score,
            new ItemFavorite(false),
            this._tags
        );
    }
  
}

module.exports = FillItem;
