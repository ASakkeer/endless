const express = require("express");
const Sheets = require("../models/sheets.model.js");

const router = express.Router();

// Get all users
router.get("/getAll", async (req, res) => {
  try {
    const sheets = await Sheets.find();
    res.json(sheets);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Unable to retrieve sheets. Try after sometime." });
  }
});

// Create the sheet
router.post("/addSheet", async (req, res) => {
  try {
    const sheets = await Sheets.create(req.body);
    const returnData = {
      success: true,
      message: "Sheet added successfully.",
      data: sheets,
    };
    res.status(200).json(returnData);
  } catch (err) {
    console.error(err);
    const returnData = {
      success: false,
      message: "Unable to add the sheet. Try after sometime.",
    };
    res.status(500).json(returnData);
  } finally {
    await mongoose.connection.close();
  }
});

// Remove the sheet
router.delete("/removeSheet/:_id", async (req, res) => {
  try {
    const id = req.params._id;
    const sheets = await Sheets.findOneAndDelete({ _id: id });
    if (!sheets) {
      return res.status(404).json({
        success: false,
        message: "Sheet not found.",
      });
    }
    const returnData = {
      success: true,
      message: "Sheet deleted successfully.",
      data: sheets,
    };
    res.status(200).json(returnData);
  } catch (err) {
    console.error(err);
    let message = "Unable to delete the sheet. Try after sometime.";
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

// Update the sheet
router.put("/updateSheet/:_id", async (req, res) => {
  try {
    const id = { _id: req.params._id };
    const sheets = await Sheets.findOneAndUpdate(id, req.body, {
      new: true,
    });
    if (!sheets) {
      return res.status(404).json({
        success: false,
        message: "Sheet not found.",
      });
    }
    const returnData = {
      success: true,
      message: "Sheet updated successfully.",
      data: sheets,
    };
    res.status(200).json(returnData);
  } catch (err) {
    console.error(err);
    let message = "Unable to update the sheet. Try after sometime.";
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

// Dummy response to create the sheet
// {
//     "userId": "63dcda1ae42c33e5704270a2",
//     "title": "SK BAKES",
//     "description": "Paytm",
//     "totalAmount": "62355",
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
