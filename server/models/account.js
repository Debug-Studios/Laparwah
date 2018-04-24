const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    username: { type: String, unique: true, lowercase: true },
    name: String,
    email: { type: String, required: true, unique: true, lowercase: true },
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
        id: { type: String, unique: true }
      },
      facebook: {
        id: { type: String, unique: true }
      },
      twitter: {
        id: { type: String, unique: true }
      },
      microsoft: {
        id: { type: String, unique: true }
      }
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('Account', accountSchema);
