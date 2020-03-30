const JWT = require('jsonwebtoken');

class GenerateToken {

    constructor(user) {
        this._user = user;
    }
    call() {
        const payload = this._user.toJson();
        const token = JWT.sign(payload, secretKey);
        return token;
    }

}

module.exports = GenerateToken;