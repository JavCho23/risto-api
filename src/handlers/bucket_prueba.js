// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "us-east-2" });

// Create S3 service object
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

var params = {
    Bucket: "node-sdk-sample-dc0fd46f-a494-4f33-9e12-d1563666b460",
    Key: "hello-from-lambda.js"
};
s3.getObject(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data);           // successful response

});

// call S3 to retrieve upload file to specified bucket
// var uploadParams = { Bucket: process.argv[2], Key: "", Body: "" };
// var file = process.argv[3];

// Configure the file stream and obtain the upload parameters
// var fs = require("fs");
// var fileStream = fs.createReadStream(file);
// fileStream.on("error", function(err) {
//   console.log("File Error", err);
// });

// uploadParams.Body = fileStream;
// var path = require("path");
// uploadParams.Key = path.basename(file);

// // call S3 to retrieve upload file to specified bucket
// s3.upload(uploadParams, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   }
//   if (data) {
//     console.log("Upload Success", data.Location);
//   }
// });
