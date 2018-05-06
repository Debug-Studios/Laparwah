const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: 'Account' },
    co_creator: { type: Schema.Types.ObjectId, ref: 'Account' },
    title: { type: String, required: true },
    content: String,
    heroImage: {
      type: String,
      default:
        'https://images.pexels.com/photos/700971/pexels-photo-700971.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    },
    locale: String,
    category: { type: String, required: true },
    main_tag: { type: String, required: true },
    tags: { type: [String], required: true },
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
      likes: { type: Number, default: 0 }
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('News', newsSchema);
