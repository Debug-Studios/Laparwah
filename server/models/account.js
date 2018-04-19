const dynamo = require('dynamodb');
const Joi = require('joi');

exports.Account = dynamo.define('Account', {
  hashKey: 'username',
  timestamps: true,
  schema: {
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    name: Joi.string(),
    email: Joi.string()
      .email()
      .required(),
    age: Joi.number(),
    roles: dynamo.types.stringSet(),
    settings: {
      nickname: Joi.string(),
      acceptedTerms: Joi.boolean().default(false)
    }
  },
  tableName: 'laparwah_accounts'
});
