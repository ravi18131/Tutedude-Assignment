const nodemailer = require('nodemailer');
const config = require('../config/index');

// Create the email transporter using Gmail and the provided credentials
const Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.gmailAppEmail,
        pass: config.emailPass,
    },
});

module.exports = Transporter;
