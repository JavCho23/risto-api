class ResponseError extends Error {
    constructor(responseCode, msjError) {
        super(msjError);
        this._responseCode = responseCode;
    }
    get responseCode(){
        return this._responseCode;
    }
}

module.exports = ResponseError;