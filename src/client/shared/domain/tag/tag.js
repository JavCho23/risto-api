class Tag {
  constructor(id_tag, name) {
    this._id = id_tag;
    this._name = name;
  }

  toJson() {
    return {
      id: this._id.value,
      name: this._name.value
    };
  }
  toString() {
    return this._name.value;
  }
}

module.exports = Tag;
