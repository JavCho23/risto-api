
const VerifyToken = require("./verify_token");

exports.authVerifyHandler = function (event, context, callback) {
    const token = event.authorizationToken;
    const verifyToken = new VerifyToken(token);
    switch (verifyToken.call("mySecurityKey")) {
    case "allow":
        callback(null, generatePolicy("comensal", "Allow", event.methodArn));
        break;
    case "deny":
        callback(null, generatePolicy("comensal", "Deny", event.methodArn));
        break;
    case "unauthorized":
        callback("Unauthorized");   // Return a 401 Unauthorized response
        break;
    default:
        callback("Error: Invalid token"); // Return a 500 Invalid token response
    }
};

// Help function to generate an IAM policy
var generatePolicy = function (principalId, effect, resource) {
    var authResponse = {};

    authResponse.principalId = principalId;
    if (effect && resource) {
        var policyDocument = {};
        policyDocument.Version = "2012-10-17";
        policyDocument.Statement = [];
        var statementOne = {};
        statementOne.Action = "execute-api:Invoke";
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    return authResponse;
};