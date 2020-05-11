const JSONResponse = require("./response");
class SuccessResponse extends JSONResponse {
  constructor() {
    super(204, {});
  }
}

module.exports = SuccessResponse;
