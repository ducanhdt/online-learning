const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const fileSchema = new mongoose.Schema(
  {
    class: { type: ObjectId, ref: 'Classroom' },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    file_path: {
      type: String,
      required: true
    },
    file_mimetype: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const File = mongoose.model('File', fileSchema);

module.exports = File;
