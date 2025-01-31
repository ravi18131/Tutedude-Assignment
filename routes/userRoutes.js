const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
// User Sign-Up
router.post('/signup', userController.signUp);

// User Login
router.post('/signin', userController.login);

// User Login
router.get('/', userController.getAllUsers);

// Get User Profile (protected route)
router.get('/:username', userController.getUserProfile);

// Update User Profile (protected route)
router.patch('/:username',upload.single("avatar"),userController.updateUserProfile);

// Delete User Account (protected route)
router.delete('/profile', authMiddleware, userController.deleteUser);

module.exports = router;
