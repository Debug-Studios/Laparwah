const express = require('express');
const app = express();
const path = require('path');

// DynamoDB
const dynamo = require('dynamodb');
const AWS = dynamo.AWS;
AWS.config.loadFromPath(process.env.HOME + '/.aws/credentials.json');
AWS.config.update({ region: 'us-west-2' });
require('./models/account');

dynamo.createTables(err => {
  if (err) console.log('Error when trying to create tables', err);
});

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/client/index.html'));
});

app.listen(process.env.PORT || 4000, () => {
  console.log('Listening');
});
