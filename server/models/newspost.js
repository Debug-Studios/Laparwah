const dynamo = require('dynamodb');
const Joi = require('joi');

module.exports = dynamo.define('Account', {
  hashKey: 'creator_email',
  rangeKey: 'id',
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
