const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;
const ActionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    actionGroupId: { type: ObjectId, ref: 'ActionGroup' },
    botId: { type: ObjectId, ref: 'Bot' },
    type: {
      type: String,
      enum: ['SYSTEM', 'NORMAL', 'CUSTIOM', 'QUESTION'],
      default: 'NORMAL',
    },
    createdBy: {
      accountId: { type: ObjectId, ref: 'Account' },
      time: { type: Date, default: Date.now },
    },
    actionCards: [],
    updatedBy: [
      {
        accountId: { type: ObjectId, ref: 'Account' },
        time: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true, versionKey: false },
);
module.exports = mongoose.model('Action', ActionSchema);
