const JSONResponse = require('./response')
class SuccessResponse extends JSONResponse{
    constructor(body){
        super(200,body);
    }
}

module.exports = SuccessResponse;