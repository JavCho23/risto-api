const VerifyUser = require('../../user/aplication/find/user_finder');
const RegisterUser = require('../../user/aplication/register/register_user');
const GenerateToken = require("./generate_token");
const UserId = require("../../../shared/domain/user_id");
const MySqlUserRepository = require("../../user/infrastructure/mysql_user_repository");
class Login {
    constructor(userData, securityKey) {
        this._userData = userData;
        this._securityKey = securityKey;
    }
    async call() {
        const verifyUser = new VerifyUser(new MySqlUserRepository());
        let user = await verifyUser.call(new UserId(this._userData.id));
        if (!user) {
            const registerUser = new RegisterUser(new MySqlUserRepository());
            user = await registerUser.call(this._userData);
        }

        const generateToken = new GenerateToken(user, this._securityKey);
        return generateToken.call();
    }
}

module.exports = Login;