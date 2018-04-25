const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema(
  {
    creator_id: { type: Schema.Types.ObjectId, ref: 'Account' },
    co_creator_id: { type: Schema.Types.ObjectId, ref: 'Account' },
    title: String,
    content: String,
    heroImage: String,
    locale: String,
    category: String,
    main_tag: String,
    tags: [String],
    stats: {
      likes: Number
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('News', newsSchema);
