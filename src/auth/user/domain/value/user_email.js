const RawString = require("../../../../shared/domain//value/raw_string");

class UserEmail extends RawString {
    constructor(value) {
        super(value);
    }
}

module.exports = UserEmail;
