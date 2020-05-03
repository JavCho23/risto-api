const TagConstans = require("../../infrastructure/tag_constans.json");
class GetCategory {
  constructor(repository) {
    this.repository = repository;
  }
  call(id_item) {
    return this.repository.listTag(id_item, TagConstans.category);
  }
}

module.exports = GetCategory;
