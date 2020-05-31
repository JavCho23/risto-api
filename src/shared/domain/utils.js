const XLSX = require("xlsx");

function paginate(array, limit, offset) {
  return array.filter((x, index) => index >= offset && index < limit);
}
function sheet2array(sheet) {
  var result = [];
  var row;
  var rowNum;
  var colNum;
  var range = XLSX.utils.decode_range(sheet["!ref"]);
  for (rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
    row = [];
    for (colNum = range.s.c; colNum <= range.e.c; colNum++) {
      var nextCell = sheet[XLSX.utils.encode_cell({ r: rowNum, c: colNum })];
      if (typeof nextCell === "undefined") {
        row.push(void 0);
      } else row.push(nextCell.w);
    }
    result.push(row);
  }
  return result;
}

var generatePolicy = function(principalId, effect, resource) {
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

module.exports = {
  paginate: paginate,
  sheetToArray: sheet2array,
  generatePolicy: generatePolicy
};
