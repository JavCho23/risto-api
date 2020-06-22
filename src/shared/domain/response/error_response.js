const JSONResponse = require("./response");
class ErrorResponse extends JSONResponse {
  constructor(error) {
    super(error.responseCode | 500, error.message);
  }
}

module.exports = ErrorResponse;
