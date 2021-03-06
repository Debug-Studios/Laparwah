const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    name: { type: String, default: 'Unknown Name' },
    email: { type: String, required: true, unique: true, lowercase: true },
    age: Number,
    gender: String,
    roles: [String],
    social: {
      email: String,
      facebook: String,
      twitter: String
    },
    location: String,
    designation: String,
    spectrum: { type: String, default: '-' },
    special_role: String,
    likes: [Schema.Types.ObjectId],
    oauth: {
      google: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        index: true
      },
      facebook: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        index: true
      },
      twitter: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        index: true
      },
      microsoft: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        index: true
      }
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('Account', accountSchema);
