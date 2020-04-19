class JSONResponse{
    constructor(responseCode, body){
        this._isBase64Encode = false;
        this._headers = { "Content-Type": "application/json" };
        this._responseCode = responseCode;
        this._body = body;
    }

    toJson(){
        return {
            isBase64Encoded: this._isBase64Encode,
            statusCode : this._responseCode,
            headers: this._headers,
            body: JSON.stringify(this._body)
        };
    }

}

module.exports = JSONResponse;