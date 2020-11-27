const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;
const BotSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    token: { type: String, trim: true },
    logo: { type: String, trim: true },
    roles: [
      { account: { type: ObjectId, ref: 'Account' }, role: String, _id: false },
    ],
  },
  { timestamps: true, versionKey: false },
);
module.exports = mongoose.model('Bot', BotSchema);
