const JSONResponse = require('./response')
class ErrorResponse extends JSONResponse{
    constructor(error){
        super(error.responseCode,error.message);
    }
}

module.exports = ErrorResponse;