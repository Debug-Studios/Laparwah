const dynamo = require('dynamodb');
const Joi = require('joi');

module.exports = dynamo.define('Account', {
  hashKey: 'email',
  timestamps: true,
  schema: {
    id: dynamo.types.uuid(),
    name: Joi.string(),
    email: Joi.string()
      .email()
      .required(),
    age: Joi.number(),
    gender: Joi.string(),
    roles: dynamo.types.stringSet().required(),
    settings: {
      nickname: Joi.string()
    },
    oauth: {
      google: {
        id: Joi.string()
      },
      facebook: {
        id: Joi.string()
      },
      twitter: {
        id: Joi.string()
      },
      microsoft: {
        id: Joi.string()
      }
    }
  },
  tableName: 'laparwah_accounts'
});
