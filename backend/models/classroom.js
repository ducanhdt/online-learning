const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const ClassroomSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    description: {
      type: String,
    },
    logo: { type: String, trim: true },
    member: [{ type: ObjectId, ref: 'Account' }],
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
module.exports = mongoose.model('Classroom', ClassroomSchema);
