const RawString = require("../../../../shared/domain/value/raw_string");

class PersonName extends RawString {
    constructor(value) {
        super(value);
    }
}

module.exports = PersonName;
