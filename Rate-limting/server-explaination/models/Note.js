const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    userId: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);