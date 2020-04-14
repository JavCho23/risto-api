const ResponseError = require("./response_error");

class DataBaseError extends ResponseError {
    constructor() {
        super(400,"The data you are sending is incorrect");
    }
}

module.exports = DataBaseError;