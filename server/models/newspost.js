const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    heroImage: Joi.string(),
    category: Joi.string(),
    locale: Joi.string(),
    tag: Joi.string()
  },
  tableName: 'laparwah_news'
});
