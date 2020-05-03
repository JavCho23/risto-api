const TagConstans = require("../../infrastructure/tag_constans.json");

class ListTags {
  constructor(repository) {
    this.repository = repository;
  }
  call(id_item) {
    return this.repository.listTag(id_item, TagConstans.tags);
  }
}

module.exports = ListTags;
