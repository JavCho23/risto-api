const db = require("../../../../shared/domain/db");
const Item = require("../domain/item");
const RawString = require("../../../../shared/domain/value/raw_string");
const RawDouble = require("../../../../shared/domain/value/raw_double");
const RawBool = require("../../../../shared/domain/value/raw_bool");
const Uuid = require("../../../../shared/domain/value/uuid");
const NotFoundError = require("../../../../shared/domain/error/no_found_error");

class MySqlItemRepository {
  async find(idItem, productLister, tagLister) {
    const data = await db.doQuery(
      `SELECT id_item as idItem, item.name as name, local.name as local, item.description, local.id_local as idLocal , item.score, item.available, city.name as city
      FROM item 
      INNER JOIN catalog ON catalog.id_catalog = item.id_catalog
      INNER JOIN local ON local.id_local = catalog.id_local
      INNER JOIN location ON local.id_location = location.id_location
      INNER JOIN city ON location.id_city = city.id_city
      WHERE item.id_item = ? AND item.state = 1;`,
      [idItem.value]
    );
    if (data.length == 0) throw new NotFoundError();
    return new Item(
      idItem,
      new RawString(data[0].name),
      new RawString(data[0].description),
      new RawString(data[0].local),
      new Uuid(data[0].idLocal),
      new RawDouble(data[0].score),
      new RawBool(data[0].avialable),
      new RawString(data[0].city),
      await tagLister.call(idItem),
      await productLister.call(idItem)
    );
  }
  async listByLocal(idLocal, limit, offset, productLister, tagLister) {
    const data = await db.doQuery(
      `SELECT id_item as idItem
      FROM item 
      INNER JOIN catalog ON catalog.id_catalog = item.id_catalog
      INNER JOIN local ON local.id_local = catalog.id_local
      WHERE local.id_local = ? AND item.state = 1
      LIMIT ? OFFSET ?;`,
      [idLocal.value, limit.value, offset.value]
    );
    return await Promise.all(
      data.map(
        async (item) =>
          await this.find(new Uuid(item.idItem), productLister, tagLister)
      )
    );
  }
  async addOneView(idItem) {
    await db.doQuery(
      `UPDATE item SET views = views + 1 
      WHERE id_item = ?`,
      [idItem.value]
    );
  }
  async getViews(idItem) {
    const data = await db.doQuery(
      `SELECT views FROM item 
      WHERE id_item = ?`,
      [idItem.value]
    );
    return new RawDouble(data[0].views);
  }
  async remove(idItem) {
    await db.doQuery(
      `UPDATE item SET state = 0 
      WHERE id_item = ?`,
      [idItem.value]
    );
  }
  async changeItemAvialable(idItem) {
    await db.doQuery(
      `UPDATE item SET available = !available 
      WHERE id_item = ?`,
      [idItem.value]
    );
  }
}

module.exports = MySqlItemRepository;
