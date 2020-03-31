const Login = require("./login");
exports.authLoginHandler = async event => {
    const { pathParameters } = event;
    const response = {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        isBase64Encoded: false
    };
    try {
        const login = new Login(pathParameters, "mySecurityKey");
        const token = await login.call();
        response.body = JSON.stringify({ token: token });
    } catch (error) {
        throw error;
        // response.statusCode = 401;
        // response.body = JSON.stringify({ message: error.message });
    }
    return response;
};