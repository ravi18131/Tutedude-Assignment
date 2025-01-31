const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Assuming your User model is in models/User.js
const { uploadToCloudinary, deleteFromCloudinary } = require("../helper/uploadHelper")
const { sendVerificationEmail } = require("./authController")

// Sign Up User
const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });
        const existingUsername = await User.findOne({ username: username });

        if (existingUsername) {
            return res.status(400).json({ success: false, message: "Username is not available!" });
        }

        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists!" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashPassword });

        const token = jwt.sign({ username: newUser.username, email: newUser.email, id: newUser._id }, process.env.JSON_WEB_TOKEN_SECRET_KEY);

        await sendVerificationEmail(newUser)

        return res.status(200).json({ user: newUser, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

// Sign In User
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let existingUser = await User.findOne({ email });
        if (!existingUser) {
            existingUser = await User.findOne({ username: email });
            if (!existingUser) {
                return res.status(404).json({ success: false, message: "User not found!" });
            }
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if (!matchPassword) {
            return res.status(400).json({ success: false, message: "Check email and password again!!" });
        }
        if (!existingUser.isVerified) {
            return res.status(400).json({ success: false, message: "Please verify your email, check your email span folder also!!" });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JSON_WEB_TOKEN_SECRET_KEY);
        return res.status(200).json({ user: existingUser, token, message: "User login successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

//Get All Users
const getAllUsers = async (req, res) => {
    try {
        // Find the authenticated user
        const user = await User.find({}).select("-password"); // Exclude password from response
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get User Profile (Authenticated User)
const getUserProfile = async (req, res) => {
    try {
        // Find the authenticated user
        const user = await User.findOne(req.params).select("-password"); // Exclude password from response
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        console.log("user :", user)
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Update User Profile

const updateUserProfile = async (req, res) => {
    const { username } = req.params; // Extract username as a string

    if (!username) {
        return res.status(400).json({ success: false, message: "Username is required" });
    }

    try {
        // Extract form data from req.body
        const { bio, hobbies, interests, email } = req.body; // Parsed by `multer` or another middleware
        const avatar = req.file; // File uploaded by `multer`
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let avatarUrl = user.profileDetails.avatar;

        // Handle avatar upload to Cloudinary if a new avatar file is provided
        if (avatar) {
            const avatarBuffer = avatar.buffer;
            const mimeType = avatar.mimetype;
            const base64Data = Buffer.from(avatarBuffer).toString("base64");
            const avatarUri = `data:${mimeType};base64,${base64Data}`;

            const uploadResult = await uploadToCloudinary(avatarUri, avatar.originalname);
            if (uploadResult.success && uploadResult.result) {
                // Delete the previous avatar from Cloudinary
                if (user.profileDetails.avatar) {
                    await deleteFromCloudinary(user.profileDetails.avatar);
                }
                avatarUrl = uploadResult.result.secure_url;
            }
        }

        // Check if the email is updated and mark the user as unverified
        let isVerified = user.isVerified;
        if (email && email !== user.email) {
            isVerified = false;
        }

        // Update the user fields
        const updatedUser = await User.findOneAndUpdate(
            { username }, // Match by username (string)
            {
                email,
                profileDetails: {
                    bio: bio || user.profileDetails.bio,
                    hobbies: hobbies ? JSON.parse(hobbies) : user.profileDetails.hobbies,
                    interests: interests ? JSON.parse(interests) : user.profileDetails.interests,
                    avatar: avatarUrl,
                },
                isVerified,
                updatedAt: Date.now(),
            },
            { new: true }
        );

        console.log("updatedUser", updatedUser);

        return res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        console.error("Error updating user profile:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Delete User Account
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = {
    signUp,
    login,
    getAllUsers,
    getUserProfile,
    updateUserProfile,
    deleteUser,
};
