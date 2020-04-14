const ResponseError = require("./response_error");

class NotFoundError extends ResponseError {
    constructor() {
        super(404,"The requested resource was not found");
    }
}

module.exports = NotFoundError;