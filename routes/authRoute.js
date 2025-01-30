const express = require("express");
const passport = require("passport");
const config = require('../config')
const baseUrl = config.baseUrl;
const { verifyEmail, forgotPassword, forgotPasswordConfirm } = require('../controllers/authController')
const router = express.Router();

// Route to start Google OAuth login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback route for Google to redirect after login
router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        const token = req.user.token;
        const user = req.user.user;

        res.redirect(`${baseUrl}/signIn?token=${token}&name=${user.name}&email=${user.email}&role=${user.role}&userId=${user._id}&avatar=${user.avatar}`);
    }
);

router.get(`/verify/:userId/:uniqueString`, verifyEmail);

router.post('/forgot-password', forgotPassword)

router.post('/forgot-password/confirm', forgotPasswordConfirm)

module.exports = router;
