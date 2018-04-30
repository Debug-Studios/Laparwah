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
      mod1_approved: { type: Boolean, default: false },
      mod2_approved: { type: Boolean, default: false },
      admin_approved: { type: Boolean }
    },
    url: { type: String, lowercase: true, required: true, unique: true },
    stats: {
      likes: Number
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('News', newsSchema);
