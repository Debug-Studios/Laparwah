const dynamo = require('dynamodb');
const AWS = dynamo.AWS;
const Joi = require('joi');
AWS.config.loadFromPath(process.env.HOME + '/.aws/credentials.json');
AWS.config.update({ region: 'us-west-2' });

dynamo.define('example-Account', {
  hashKey: 'name',
  rangeKey: 'email',
  schema: {
    name: Joi.string(),
    email: Joi.string(),
    age: Joi.number()
  },
  indexes: [
    { hashKey: 'name', rangeKey: 'age', type: 'local', name: 'NameAgeIndex' }
  ]
});

dynamo.createTables(
  {
    Account: { readCapacity: 1, writeCapacity: 1 }
  },
  err => {
    if (err) console.log(err);
    else console.log('Tables created');
  }
);
