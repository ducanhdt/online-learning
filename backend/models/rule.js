const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const RuleSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    keyword: [
      {
        type: String,
        trim: true,
        es_indexed: true,
      },
    ],
    botId: { type: ObjectId, ref: 'Bot' },
    actions: [{ type: ObjectId, ref: 'Action' }],
    createdBy: {
      accountId: { type: ObjectId, ref: 'Account' },
      time: { type: Date, default: Date.now },
    },
    updatedBy: [
      {
        accountId: { type: ObjectId, ref: 'Account' },
        time: { type: Date, default: Date.now },
        _id: false,
      },
    ],
  },
  { timestamps: true, versionKey: false },
);
module.exports = mongoose.model('Rule', RuleSchema);
