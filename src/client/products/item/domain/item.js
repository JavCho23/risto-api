
class Item {
    constructor(id,name,local,description,category,score, tags) {
        this._id = id;
        this._name = name;
        this._local = local;
        this._description = description;
        this._category = category;
        this._score = score;
        this._tags = tags;
    }
    toJson() {
        return {
            id: this._id.value,
            name: this._name.value,
            image: this._image.value,
            local: this._local.value,
            score: this._score.value,
            description: this._description.value,
            tags: this._tags.map(tag => tag.value),
            category: this._category.value
        };
    }
}

module.exports = Item;
