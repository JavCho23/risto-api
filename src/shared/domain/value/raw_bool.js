class RawBool {
    constructor(value) {
        this._value = value ? true : false;
    }

    get value() {
        return this._value;
    }
    toString() {
        this._value.toString();
    }
}

module.exports = RawBool;
