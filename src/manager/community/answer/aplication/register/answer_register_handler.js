const AnswerRegister = require("./answer_register");
const MySqlAnswerRepository = require("../../infrastructure/mysql_answer_repository")
const CreatedResponse = require("../../../../../shared/domain/response/created_response")
const ErrorResponse = require("../../../../../shared/domain/response/error_response")
exports.answerRegisterHandler = async event => {
    const requestBody = JSON.parse(event.body);
    let response;
    try {
        const answerRegister = new AnswerRegister(new MySqlAnswerRepository());
        const body = await answerRegister.call(requestBody);
        response = new CreatedResponse(body);
    } catch (error) {
       response = new ErrorResponse(error);
    }
    return response.toJson();
};
