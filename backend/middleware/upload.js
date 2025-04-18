const multer = require("multer");
const path = require("path");

// Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

// File Upload Middleware
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /xlsx|xls/; // Only accept Excel files
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    if (extName) {
      return cb(null, true);
    }
    cb("Error: Only Excel files are allowed!");
  },
});

module.exports = upload;