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
    mod_approved: { type: Boolean, default: false },
    url: { type: String, lowercase: true, required: true },
    stats: {
      likes: Number
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('News', newsSchema);
