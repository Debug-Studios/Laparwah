const dynamo = require('dynamodb');
const Joi = require('joi');

module.exports = dynamo.define('Account', {
  hashKey: 'id',
  rangeKey: 'creator_email',
  timestamps: true,
  schema: {
    id: dynamo.types.uuid(),
    creator_email: Joi.string()
      .email()
      .required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    type: Joi.string()
  },
  tableName: 'laparwah_news'
});
