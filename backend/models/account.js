const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const accountSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    salt: String,
    avatar: String,
    isAdmin: Boolean,
    member: [{ type: ObjectId, ref: 'Classroom' }],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Account', accountSchema);
