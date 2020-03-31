const JWT = require('jsonwebtoken');

class VerifyToken {

    constructor(token) {
        this._token = token;
    }
    call(secretKey) {

        const decoded = JWT.verify(this._token, secretKey);
        return 'deny';
    }
}

module.exports = VerifyToken;