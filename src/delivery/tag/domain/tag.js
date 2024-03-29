const RawString = require("../../../shared/domain/value/raw_string");
const Uuid = require("../../../shared/domain/value/uuid");
class Tag {
    constructor(idTag, name) {
        this._id = idTag;
        this._name = name;
    }
    static fromJson(tag) {
        return new this(new Uuid(""), new RawString(tag));
    }
    get idTag() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    toJson() {
        return {
            idTag: this._id.value,
            name: this._name.value,
        };
    }
}

module.exports = Tag;
