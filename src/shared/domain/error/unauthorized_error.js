const ResponseError = require("./response_error");

class UnauthorizedError extends ResponseError {
    constructor() {
        super(401,"The requested resource needs authentication");
    }
}

module.exports = UnauthorizedError;