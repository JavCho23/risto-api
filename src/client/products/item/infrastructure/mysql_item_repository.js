const db = require("../../../../shared/domain/db");
const FillItem = require("../aplication/fill/fill_item");
const NotFoundError = require("../../../../shared/domain/error/no_found_error");
const MySqlTagRepository = require("../../../shared/infrastructure/mysql_tag_repository");
const TagGetCategory = require("../../../shared/aplication/get_category/tag_get_category");
const TagListTags = require("../../../shared/aplication/list_tags/tag_list_tags");

class MySqlItemRepository {
  async find(itemId, state) {
    const data = await db.doQuery(
      `SELECT id_item, item.name as name, local.name as localName, item.description 
        FROM item 
        INNER JOIN catalog ON catalog.id_catalog = item.id_catalog 
        INNER JOIN local ON local.id_local = catalog.id_local 
        WHERE item.id_item = ? AND item.state = 1 AND item.available = 1`,
      [itemId.value, state.value]
    );
    if (data.length == 0) throw new NotFoundError();
    const fillItem = new FillItem(
      data[0],
      new TagGetCategory(new MySqlTagRepository()),
      new TagListTags(new MySqlTagRepository())
    );

    return await fillItem.call();
  }
  async listFeed() {
    const data = await db.doQuery(
      `SELECT id_item, item.name as name, local.name as localName, item.description 
        FROM item 
        INNER JOIN catalog ON catalog.id_catalog = item.id_catalog 
        INNER JOIN local ON local.id_local = catalog.id_local 
        WHERE item.state = 1 AND item.available = 1`
    );
    if (data.length == 0) throw new NotFoundError();
    const items = await Promise.all(
      data.map(async (item) => {
        const fillItem = new FillItem(
          item,
          new TagGetCategory(new MySqlTagRepository()),
          new TagListTags(new MySqlTagRepository())
        );
        return await fillItem.call();
      })
    );
    return items;
  }
}

module.exports = MySqlItemRepository;
