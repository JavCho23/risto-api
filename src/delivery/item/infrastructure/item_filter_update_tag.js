const FilterUpdateChildEntities = require("../../../shared/infrastructure/filter_update_child_entities");
class ItemFilterUpdateTag extends FilterUpdateChildEntities {
  constructor(idItem, tags, tagLister, tagAdder, tagRemover) {
    super(idItem, tags, tagLister, ()=>null, tagAdder, tagRemover);
  }
  isEqual(niu, old) {
    return niu.value == old.name.value;
  }
  async add(idItem, tag) {
    await this._entityAdder(idItem,tag);
  }
  async remove(idItem, tag) {
    await this._entityRemover(idItem,tag.idTag);
  }
}

module.exports = ItemFilterUpdateTag;
