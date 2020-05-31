class RawNumber {
    constructor(value) {
        this._value = value;
    }

    get value() {
        return parseFloat(this._value);
    }
    toString() {
        this._value.toString();
    }
}

module.exports = RawNumber;
