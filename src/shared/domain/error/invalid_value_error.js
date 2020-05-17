const ResponseError = require("./response_error");

class InvalidValueError extends ResponseError {
    constructor() {
        super(401,"Your data has an invalid format");
    }
}

module.exports = InvalidValueError;