const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: 'Account' },
    co_creator: { type: Schema.Types.ObjectId, ref: 'Account' },
    title: { type: String, required: true },
    content: String,
    heroImage: String,
    locale: String,
    category: { type: String, required: true },
    main_tag: String,
    tags: [String],
    approval: {
      done: {
        mod1: { type: Boolean, default: false },
        mod2: { type: Boolean, default: false },
        mod3: { type: Boolean, default: false }
      },
      mod1: { type: Boolean, default: false },
      mod2: { type: Boolean, default: false },
      mod3: { type: Boolean, default: false },
      admin: { type: Boolean }
    },
    url: { type: String, lowercase: true, required: true, unique: true },
    stats: {
      likes: Number
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('News', newsSchema);
