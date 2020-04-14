class ResponseError extends Error {
    constructor(responseCode, msjError) {
        this._responseCode = responseCode;
        super(msjError);
    }
    get responseCode(){
        return this._responseCode;
    }
}

module.exports = ResponseError;