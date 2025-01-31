const express = require("express");
const passport = require("passport");
const config = require('../config')
const baseUrl = config.baseUrl;
const { verifyEmail, forgotPassword, forgotPasswordConfirm } = require('../controllers/authController')
const router = express.Router();


router.get(`/verify/:userId/:uniqueString`, verifyEmail);

router.post('/forgot-password', forgotPassword)

router.post('/forgot-password/confirm', forgotPasswordConfirm)

module.exports = router;
