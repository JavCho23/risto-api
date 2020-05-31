const JSONResponse = require("./response");
const NoFoundError = require("../error/no_found_error");
class SuccessResponse extends JSONResponse {
    constructor(body) {
        if (Array.isArray(body) && body.length == 0) throw new NoFoundError();
        super(200, body);
    }
}

module.exports = SuccessResponse;
