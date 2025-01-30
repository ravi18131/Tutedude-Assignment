const dotenv = require("dotenv");
dotenv.config();

// Ensure environment variables are set
const cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryKey = process.env.CLOUDINARY_API_KEY;
const cloudinarySecret = process.env.CLOUDINARY_API_SECRET;
const adminEmail = process.env.ADMIN_EMAIL;
const gmailAppEmail = process.env.GMAIL_APP_EMAIL;
const emailPass = process.env.EMAIL_PASS;
const baseUrl = process.env.CLIENT_BASE_URL;
const baseServerUrl = process.env.SERVER_BASE_URL;
const delhiveryApi = process.env.DELHIVERY_API_KEY;
const delhiveryUrl = process.env.DELHIVERY_API_URL;

// Throw error if required Cloudinary variables are missing
if (!cloudinaryName || !cloudinaryKey || !cloudinarySecret) {
    throw new Error('Missing Cloudinary environment variables');
}

// Throw error if Gmail credentials are missing
if (!gmailAppEmail || !emailPass) {
    throw new Error('Missing Gmail environment variables');
}

// Configuration object
const config = {
    cloudinary: {
        name: cloudinaryName,
        key: cloudinaryKey,
        secret: cloudinarySecret,
    },
    adminEmail: adminEmail || 'admin@example.com',
    gmailAppEmail: gmailAppEmail || '',
    emailPass: emailPass || '',
    baseUrl: baseUrl,
    baseServerUrl: baseServerUrl,
    delhiveryApi: delhiveryApi,
    delhiveryUrl: delhiveryUrl,
};

module.exports = config;
