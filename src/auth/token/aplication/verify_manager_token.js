const JWT = require("jsonwebtoken");
const aplications = require("../infrastructure/persitence/aplications.json");
class VerifyToken {
    constructor(token) {
        this._token = token;
    }
    call(secretKey) {
        try {
            const decoded = JWT.verify(this._token, secretKey);
            if (decoded.aplication != aplications.manager) return "deny";
        } catch (err) {
            return "unauthorized";
        }
        return "allow";
    }
}

module.exports = VerifyToken;
