const fs = require('fs').promises; // Using fs/promises
const handlebars = require('handlebars');
const transporter = require('./transporter'); // Assuming this is the nodemailer transporter setup
const config = require('../config/index'); // Assuming config is where adminEmail is stored

// Email Transporter function for sending email
const EmailTransporter = async ({ pathName, replacementObj, toMail, subject }) => {
    try {
        const html = await readHtmlFile(pathName);
        const template = handlebars.compile(html);
        const htmlToSend = template(replacementObj);

        const mailOptions = {
            from: `<${config.adminEmail}>`,
            to: toMail,
            subject: subject,
            html: htmlToSend,
        };

        // Send the email using the transporter
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return { error: 'Internal server error..', status: 400 };
    }
};

// Function to read the HTML file
const readHtmlFile = async (path) => {
    try {
        const html = await fs.readFile(path, { encoding: 'utf-8' });
        return html;
    } catch (error) {
        console.error("Error reading HTML file:", error);
        return '';
    }
};

module.exports = { EmailTransporter };
