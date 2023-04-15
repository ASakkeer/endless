const mongoose = require("mongoose");

const CalculationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  sheetId: {
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
  expenseType: {
    type: String,
    required: true,
  },
  expenseAmount: {
    type: String,
    required: true,
  },
  spendDate: {
    type: String,
    required: false,
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

const Calculation = mongoose.model("calculations", CalculationSchema);

module.exports = Calculation;
