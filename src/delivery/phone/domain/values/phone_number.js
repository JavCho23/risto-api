const RawString = require("../../../../shared/domain/value/raw_string");

class PhoneNumber extends RawString {
    constructor(value) {
        super(value);
    }
}

module.exports = PhoneNumber;
