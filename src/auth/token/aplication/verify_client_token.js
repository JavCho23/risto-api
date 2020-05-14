const JWT = require("jsonwebtoken");

class VerifyToken {

    constructor(token) {
        this._token = token;
    }
    call(secretKey) {
        try {
            JWT.verify(this._token, secretKey);
        } catch (err) {
            return "unauthorized";
        }
        return "allow";
    }
}

module.exports = VerifyToken;