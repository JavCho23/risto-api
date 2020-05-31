const JSONResponse = require("./response");
class NoContentResponse extends JSONResponse {
    constructor() {
        super(204, {});
    }
}

module.exports = NoContentResponse;
