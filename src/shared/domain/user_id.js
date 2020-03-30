const RawString = require("./value/raw_string");

class UserId extends RawString {
    constructor(value) {
        super(value);
    }
}

module.exports = UserId;
