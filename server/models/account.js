const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  name: String,
  email: String,
  age: Number,
  gender: String,
  roles: [String],
  social: {
    email: String,
    facebook: String,
    twitter: String
  },
  oauth: {
    google: {
      id: String
    },
    facebook: {
      id: String
    },
    twitter: {
      id: String
    },
    microsoft: {
      id: String
    }
  }
});

module.exports = mongoose.model('Account', accountSchema);
