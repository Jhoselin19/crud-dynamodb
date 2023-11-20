// dynamodb.js
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIAZAFDPVY5Z5KZ3OHV',
  secretAccessKey: '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',
  region: 'us-east-2'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = dynamoDB;
