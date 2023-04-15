const mongoose = require("mongoose");

const SheetsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  totalAmount: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: Array,
    required: false,
  },
  updatedBy: {
    type: Array,
    required: false,
  },
});

const Sheets = mongoose.model("sheets", SheetsSchema);

module.exports = Sheets;
