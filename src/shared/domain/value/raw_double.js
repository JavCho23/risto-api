class RawDouble {
    constructor(value) {
        this._value = value;
    }

    get value() {
        return this._value;
    }
    toString() {
        this._value.toString();
    }
}

module.exports = RawDouble;
