const ResponseError = require("./response_error");

class RegisterError extends ResponseError {
    constructor() {
        super(400, "Could not register what was requested");
    }
}

module.exports = RegisterError;
