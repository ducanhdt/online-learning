const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;
const TemplateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    logo: { type: String, trim: true },
    bot: { type: ObjectId, ref: 'Bot' },
  },
  { timestamps: true, versionKey: false },
);
module.exports = mongoose.model('Template', TemplateSchema);
