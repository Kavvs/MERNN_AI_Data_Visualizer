//dataRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { uploadFile, manualEntry, getData } = require("../controllers/dataController");
const Data = require("../models/Data"); // ✅ Import the Data model
const { generateGraph } = require("../controllers/graphController"); // Import graph controller

// Fetch all stored data
router.get("/", getData); // ✅ Use getData function from controller

// File Upload Route
router.post("/upload", upload.single("file"), uploadFile);

// Manual Data Entry Route
router.post("/manual-entry", manualEntry);
router.get("/graph", generateGraph);

module.exports = router;