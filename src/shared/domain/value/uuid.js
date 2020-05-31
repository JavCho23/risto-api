const InvalidValue = require("../error/invalid_value_error");
class uuid {
    constructor(value) {
        if (
            !value.match(
                /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
            )
        )
            throw new InvalidValue();
        this._value = value;
    }

    get value() {
        return this._value;
    }
    toString() {
        this._value.toString();
    }
}

module.exports = uuid;
