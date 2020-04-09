const AnswerRegister = require("./answer_register");
const MySqlAnswerRepository = require("../infrastructure/mysql_answe_repository")
exports.answerRegisterHandler = async event => {
    const body = JSON.parse(event.body);
    
    const response = {
        statusCode: 201,
        headers: { "Content-Type": "application/json" },
        isBase64Encoded: false
    };
    try {
        const answerRegister = new AnswerRegister(new MySqlAnswerRepository());
        const result = await answerRegister.call(body);
        response.body = JSON.stringify({ result: result});
    } catch (error) {
        throw error;
        // response.statusCode = 401;
        // response.body = JSON.stringify({ message: error.message });
    }
    return response;
};
