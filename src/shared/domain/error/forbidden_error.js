const ResponseError = require("./response_error");

class ForbiddenError extends ResponseError {
    constructor() {
        super(403,"The requested resource needs more permissions");
    }
}

module.exports = ForbiddenError;