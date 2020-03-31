const JWT = require('jsonwebtoken');

class GenerateToken {

    constructor(user, securityKey) {
        this._user = user;
        this._securityKey = securityKey;
    }
    call() {
        const payload = this._user.toJson();
        const token = JWT.sign(payload, this._securityKey);
        return token;
    }

}

module.exports = GenerateToken;