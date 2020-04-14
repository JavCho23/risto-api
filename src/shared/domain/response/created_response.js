const JSONResponse = require("./response");
class CreatedResponse extends JSONResponse{
    constructor(body){
        super(200,body);
    }
}

module.exports = CreatedResponse;