const express = require("express");
const User = require("../models/user.model.js");
const Calculation = require("../models/calculation.model.js");

const router = express.Router();

// Get all users
router.get("/getAll/:_id", async (req, res) => {
  try {
    const id = req.params._id;
    const expenses = await Calculation.find({ sheetId: id }).sort({ createdDate: 'desc' });
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Unable to retrieve expenses. Try after sometime." });
  }
});

// Create the expense
router.post("/addExpense", async (req, res) => {
  try {
    const calculation = await Calculation.create(req.body);
    const returnData = {
      success: true,
      message: "Expense added successfully.",
      data: calculation,
    };
    res.status(200).json(returnData);
  } catch (err) {
    console.error(err);
    const returnData = {
      success: false,
      message: "Unable to add the expense. Try after sometime.",
    };
    res.status(500).json(returnData);
  } finally {
    await mongoose.connection.close();
  }
});

// Remove the expense
router.delete("/removeExpense/:_id", async (req, res) => {
  try {
    const id = req.params._id;
    const calculation = await Calculation.findOneAndDelete({ _id: id });
    if (!calculation) {
      return res.status(404).json({
        success: false,
        message: "Expense not found.",
      });
    }
    const returnData = {
      success: true,
      message: "Expense deleted successfully.",
      data: calculation,
    };
    res.status(200).json(returnData);
  } catch (err) {
    console.error(err);
    let message = "Unable to delete the expense. Try after sometime.";
    if (err.name === "CastError") {
      message = "Invalid ID format.";
    }
    const returnData = {
      success: false,
      message,
    };
    res.status(500).json(returnData);
  } finally {
    mongoose.connection.close();
  }
});

// Update the expense
router.put("/updateExpense/:_id", async (req, res) => {
  try {
    const id = { _id: req.params._id };
    const calculation = await Calculation.findOneAndUpdate(id, req.body, {
      new: true,
    });
    if (!calculation) {
      return res.status(404).json({
        success: false,
        message: "Expense not found.",
      });
    }
    const returnData = {
      success: true,
      message: "Expense updated successfully.",
      data: calculation,
    };
    res.status(200).json(returnData);
  } catch (err) {
    console.error(err);
    let message = "Unable to update the expense. Try after sometime.";
    if (err.name === "CastError") {
      message = "Invalid ID format.";
    }
    const returnData = {
      success: false,
      message,
    };
    res.status(500).json(returnData);
  } finally {
    mongoose.connection.close();
  }
});

module.exports = router;

// Dummy response to create the expense
// {
//     "userId": "63dcda1ae42c33e5704270a2",
//     "sheetId": "74dcda1ae42c33e5704270a1",
//     "title": "SK BAKES",
//     "description": "Paytm",
//     "expenseType": "CRED",
//     "expenseAmount": "77",
//     "spendDate": "2023-02-14T19:30:36.901Z",
//     "createdDate": "2023-02-14T19:30:36.901Z",
//     "updatedDate": "2023-02-14T19:30:36.901Z"
//     "createdBy": [
//         "63dcda1ae42c33e5704270a2",
//         "sakkeer"
//     ],
//     "updatedBy": [
//         "63dcda1ae42c33e5704270a2",
//         "sakkeer"
//     ]
// }
