class State {
    constructor(id, name, comment) {
        this._id = id;
        this._name = name;
        this._comment = comment;
    }
    get idState() {
        return this._id;
    }
    get name() {
        return this._id;
    }
    get comment() {
        return this._comment;
    }
    toJson() {
        return {
            idState: this._id.value,
            name: this._name.value,
            comment: this._comment.value,
        };
    }
}

module.exports = State;
