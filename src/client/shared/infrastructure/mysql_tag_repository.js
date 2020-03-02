const db = require("../../../shared/domain/db");
const TagName = require("../domain/tag/value/tag_name");

class MySqlTagRepository {
    async listTag(id_meal, id_category) {
        const data = await db.doQuery(
            "SELECT tag.name FROM tag INNER JOIN tagger ON tag.id_tag = tagger.id_tag INNER JOIN meal ON meal.id_meal = tagger.id_item WHERE meal.id_meal = ? AND id_category = ?",
            [id_meal.value, id_category]
        );
        const tags = data.map(tag => new TagName(tag.name));
        return tags;
    }
}

module.exports = MySqlTagRepository;
