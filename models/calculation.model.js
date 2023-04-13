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
    required: true,
  },
  updatedBy: {
    type: Array,
    required: true,
  },
});

const Calculation = mongoose.model("calculations", CalculationSchema);

module.exports = Calculation;
