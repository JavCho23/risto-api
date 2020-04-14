class JSONResponse{
    constructor(responseCode, body){
        this._isBase64Encode = false;
        this._headers = { "Content-Type": "application/json" };
        this._responseCode = responseCode;
        this._body = body;
    }

    toJson(){
        return {
            headers: this._headers,
            statusCode : this._responseCode,
            isBase64Encode: this._isBase64Encode,
            body: JSON.stringify(this._body)
        }
    }

}

module.exports = JSONResponse;