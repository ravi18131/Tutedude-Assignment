const path = require('path');
const express = require('express');
const config = require('../config');
const bcrypt = require('bcrypt');
const { EmailTransporter } = require('../helper/emailTransporter');
const UserVerification = require('../models/userVerification');
const User = require('../models/User')
const ForgotPassword = require('../models/forgotPassword');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const baseUrl = config.baseUrl;
const baseServerUrl = config.baseServerUrl;

const sendVerificationEmail = async (data) => {
    const uniqueString = uuidv4() + data._id;
    const uniqueStringHashed = await bcrypt.hashSync(uniqueString, 12);
    const url = `${baseServerUrl}/auth/verify/${data._id}/${uniqueString}`;

    const expiresDate = moment().add(6, 'hours').toDate();

    try {
        const verificationData = await UserVerification.create({
            userId: data._id,
            expiresAt: expiresDate,
            uniqueString: uniqueStringHashed
        });

        if (verificationData) {
            // Use absolute path for verify.html
            const pathName = path.join(__dirname, '..', 'template', 'verify.html');
            // const pathName = ""

            const obj = { link: url };
            const subject = "Email Verification";
            const toMail = data.email;

            try {
                const sendMail = await EmailTransporter({ pathName, replacementObj: obj, toMail, subject });
                if (sendMail) {
                    return { message: 'Email sent successfully', status: 200 };
                }
            } catch (err) {
                console.error('Error sending email:', err);
                return { error: 'Unable to send Email !!!', status: 400 };
            }
        }
    } catch (err) {
        console.error("Error creating UserVerification document:", err);
        return { error: 'Unable to create verification record', status: 400 };
    }
};

const verifyEmail = async (req, res) => {
    const { userId, uniqueString } = req.params;

    try {
        // Check if the user is already verified
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }
        if (user.isVerified) {
            return res.redirect(`${baseUrl}/auth/alreadyverified`);
        }

        // Find all verification documents for the userId
        const userVerifications = await UserVerification.find({ userId });
        if (!userVerifications.length) {
            return res.status(400).json({ message: 'Invalid verification link.' });
        }

        // Loop through each document to find the correct one based on uniqueString and check for expiration
        let validVerification = null;
        for (const verification of userVerifications) {
            const isMatch = await bcrypt.compare(uniqueString, verification.uniqueString);
            if (isMatch) {
                // Check if the verification link has expired
                const currentTime = new Date();
                if (currentTime > verification.expiresAt) {
                    return res.redirect(`${baseUrl}/auth/expired/link`);
                    // return res.status(400).json({ message: 'Verification link has expired.' });
                }
                validVerification = verification;
                break;
            }
        }

        if (!validVerification) {
            return res.status(401).json({ message: 'Invalid verification link.' });
        }

        // Update the user's email verification status
        user.isVerified = true;
        await user.save();

        // Delete the verification document after successful verification
        await UserVerification.deleteMany({ userId: user._id });

        return res.redirect(`${baseUrl}/auth/verified`);
        // return res.status(200).json({ message: 'Email successfully verified.' });

    } catch (error) {
        console.error('Error during verification:', error);
        return res.status(500).json({ message: 'An error occurred during verification.' });
    }
};

const forgotPasswordEmail = async (data) => {
    const uniqueString = uuidv4() + data._id;
    const uniqueStringHashed = await bcrypt.hashSync(uniqueString, 12);
    const url = `${baseUrl}/forgot-password/${data._id}/${uniqueString}`;

    const expiresDate = moment().add(1, 'hours').toDate(); // Set expiration to 1 hour from now

    await ForgotPassword.deleteMany({ userId: data._id })

    try {
        const verificationData = await ForgotPassword.create({
            userId: data._id, // Ensure correct userId
            expiresAt: expiresDate,
            uniqueString: uniqueStringHashed
        });

        if (verificationData) {
            // Use absolute path for resetPassword.html
            const pathName = path.join(__dirname, '..', 'template', 'resetPassword.html');

            const obj = { link: url };
            const subject = "Reset Password";
            const toMail = data.email;

            try {
                const sendMail = await EmailTransporter({ pathName, replacementObj: obj, toMail, subject });
                if (sendMail) {
                    return { message: 'Email sent successfully', status: 200 };
                }
            } catch (err) {
                console.error("Error sending email:", err);
                return { error: 'Unable to send Email !!!', status: 400 };
            }
        }
    } catch (err) {
        console.error("Error creating ForgotPassword document:", err);
        return { error: 'Unable to create verification record', status: 400 };
    }
};

// Route for handling forgot password request
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body; // Parse email from the request body

        // Find the user in the database by email
        const user = await User.findOne({ email });

        // If the user doesn't exist, return a 400 error
        if (!user) {
            return res.status(400).json({ error: 'User not found! Please try to signup.' });
        }

        // Send the forgot password email
        await forgotPasswordEmail(user);

        // Return a success response
        return res.status(201).json({
            user,
            message: 'Reset password email sent successfully...'
        });

    } catch (error) {
        console.error('Error occurred during forgot password request:', error);
        return res.status(500).json({ error: 'Internal server error!!' });
    }
};

const forgotPasswordConfirm = async (req, res) => {
    try {
        const { userId, uniqueString, password, confirmPassword } = req.body;

        // Retrieve all verification records for the given userId
        const userVerifications = await ForgotPassword.find({ userId });

        if (!userVerifications || userVerifications.length === 0) {
            return res.status(401).json({ message: 'Invalid verification link.' });
        }

        // Find the correct verification by comparing unique strings
        const matchingVerification = userVerifications.find((verification) => {
            return bcrypt.compareSync(uniqueString, verification.uniqueString);
        });

        if (!matchingVerification) {
            return res.status(402).json({ message: 'Invalid verification link.' });
        }

        // Check if the verification link has expired
        const currentTime = new Date();
        if (currentTime > matchingVerification.expiresAt) {
            return res.redirect(`${baseUrl}/auth/expired/link`);
            // return res.status(403).json({ message: 'Verification link has expired.' });
        }

        // Find the user by userId
        const user = await User.findById(matchingVerification.userId);
        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }

        // Hash the new password and update the user's password
        const hashedPassword = bcrypt.hashSync(password, 10);
        user.password = hashedPassword;
        await user.save();

        // Optionally delete all verification documents related to this user after password reset
        await ForgotPassword.deleteMany({ userId: user._id });

        // Send verification email if the user is not yet verified
        if (!user.isVerified) {
            await sendVerificationEmail(user);
        }

        // Return success message
        return res.status(200).json({ message: 'Password changed successfully...' });
    } catch (error) {
        console.error('Error during password reset:', error);
        return res.status(500).json({ message: 'An error occurred during password changing.' });
    }
};


module.exports = { sendVerificationEmail, forgotPasswordEmail, verifyEmail, forgotPassword, forgotPasswordConfirm };
