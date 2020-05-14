const JSONResponse = require("./response");
class CreatedResponse extends JSONResponse {
  constructor() {
    super(201, {});
  }
}

module.exports = CreatedResponse;
