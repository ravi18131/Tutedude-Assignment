const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// User Sign-Up
router.post('/signup', userController.signUp);

// User Login
router.post('/signin', userController.login);

// Get User Profile (protected route)
router.get('/profile', authMiddleware, userController.getUserProfile);

// Update User Profile (protected route)
router.put('/profile', authMiddleware, userController.updateUserProfile);

// Delete User Account (protected route)
router.delete('/profile', authMiddleware, userController.deleteUser);

module.exports = router;
