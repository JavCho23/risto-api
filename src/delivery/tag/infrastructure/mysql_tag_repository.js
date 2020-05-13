const db = require("../../../shared/domain/db");
const Tag = require("../domain/tag");
const RawString = require("../../../shared/domain/value/raw_string");
const Uuid = require("../../../shared/domain/value/uuid");

class MySqlTagRepository {
  async list(idItem) {
    const data = await db.doQuery(
      `SELECT tag.id_tag as idTag, tag.name FROM tagger
      INNER JOIN tag ON tag.id_tag = tagger.id_tag
      WHERE tagger.id_item = ? `,
      [idItem.value]
    );
    return data.map(
      (tag) => new Tag(new Uuid(tag.idTag), new RawString(tag.name))
    );
  }
}

module.exports = MySqlTagRepository;
