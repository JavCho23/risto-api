const db = require("../../../../shared/domain/do_query");
const Item = require("../domain/item");

class MySqlItemRepository {
  async find(itemId) {
    const data = await db.doQuery(
      "SELECT id_item, name,price, description,image FROM item WHERE id_item = ? AND state = 1",
      itemId.value
    );

    return new Item(data);
  }
  async list() {
    const data = await db.doQuery(
      "SELECT id_item, name,price,image FROM item WHERE state = 1"
    );
    const items = [];
    data.map(item => {
      items.push(new Item(item));
    });
    return items;
  }
}

module.exports = MySqlItemRepository;
