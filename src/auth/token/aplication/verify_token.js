const JWT = require('jsonwebtoken');

class VerifyToken {

    constructor(token) {
        this._token = token;
    }
    call() {
        try {
            const decoded = JWT.verify(this._token, secretKey);
        } catch (err) {
            return 'deny';
        }
        return 'allow';
    }
}

module.exports = VerifyToken;