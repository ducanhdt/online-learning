const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;
const ActionGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    actions: [{ type: ObjectId, ref: 'Action' }],
    botId: { type: ObjectId, ref: 'Bot' },
    createdBy: {
      accountId: { type: ObjectId, ref: 'Account' },
      time: { type: Date, default: Date.now },
    },
    updatedBy: [
      {
        accountId: { type: ObjectId, ref: 'Account' },
        time: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true, versionKey: false },
);
module.exports = mongoose.model('ActionGroup', ActionGroupSchema);
