const FindUser = require("../../user/aplication/find/user_finder");
const RegisterUser = require("../../user/aplication/register/register_user");
const GenerateToken = require("./generate_token");
const MySqlUserRepository = require("../../user/infrastructure/mysql_user_repository");
const User = require("../../user/domain/user");

class Login {
    constructor(userData, securityKey) {
        this._userData = userData;
        this._securityKey = securityKey;
    }
    async call(app) {
        const findUser = new FindUser(new MySqlUserRepository());
        let user = await findUser.call(new User(this._userData), app);
        if (!user) {
            const registerUser = new RegisterUser(new MySqlUserRepository());
            user = await registerUser.call(new User(this._userData));
        }

        const generateToken = new GenerateToken(user, this._securityKey);
        return generateToken.call();
    }
}

module.exports = Login;
