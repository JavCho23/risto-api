const JWT = require('jsonwebtoken');

class VerifyToken {

    constructor(token) {
        this._token = token;
    }
    call(secretKey) {
        try {
            const decoded = JWT.verify(this._token, secretKey);
        } catch (err) {
            return 'unauthorized';
        }
        return 'allow';
    }
}

module.exports = VerifyToken;