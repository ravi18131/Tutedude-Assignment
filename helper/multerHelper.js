// config/multerConfig.js
const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Temporary folder for storing files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Add a unique timestamp to the file name
    }
});

// Initialize Multer
const upload = multer({ storage });

module.exports = upload;
