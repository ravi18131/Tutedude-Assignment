const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Assuming your User model is in models/User.js
const { uploadToCloudinary, deleteFromCloudinary } = require("../helper/uploadHelper")
const { sendVerificationEmail } = require("./authController")
// // User Sign-Up
// const signUp = async (req, res) => {
//     const { username, email, password } = req.body;

//     try {
//         // Check if all fields are provided
//         if (!username || !email || !password) {
//             return res.status(400).json({ success: false, message: "Username, Email, and Password are required" });
//         }

//         // Check if the username or email already exists
//         const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//         if (existingUser) {
//             return res.status(400).json({ success: false, message: "Username or Email already exists" });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create the new user
//         const newUser = new User({
//             username,
//             email,
//             password: hashedPassword,
//         });

//         // Save the user to the database
//         await newUser.save();

//         return res.status(201).json({ success: true, message: "User created successfully" });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ success: false, message: "Internal server error" });
//     }
// };

// // User Login (username or email, password)
// const login = async (req, res) => {
//     const { usernameOrEmail, password } = req.body;

//     try {
//         // Check if username or email and password are provided
//         if (!usernameOrEmail || !password) {
//             return res.status(400).json({ success: false, message: "Username/Email and Password are required" });
//         }

//         // Find the user by username or email
//         const user = await User.findOne({
//             $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
//         });

//         if (!user) {
//             return res.status(400).json({ success: false, message: "Invalid credentials" });
//         }

//         // Compare the provided password with the hashed password in the database
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ success: false, message: "Invalid credentials" });
//         }

//         // Generate JWT Token
//         const token = jwt.sign({ id: user._id }, process.env.JSON_WEB_TOKEN_SECRET_KEY, { expiresIn: '1h' });

//         return res.status(200).json({ success: true, token });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ success: false, message: "Internal server error" });
//     }
// };

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

// Get User Profile (Authenticated User)
const getUserProfile = async (req, res) => {
    try {
        // Find the authenticated user
        const user = await User.findById(req.user.id).select("-password"); // Exclude password from response
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
    const { avatar, bio, hobbies, interests } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Update user fields if provided
        if (avatar) user.profileDetails.avatar = avatar;
        if (bio) user.profileDetails.bio = bio;
        if (hobbies) user.profileDetails.hobbies = hobbies;
        if (interests) user.profileDetails.interests = interests;

        // Save the updated user
        await user.save();

        return res.status(200).json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        console.error(error);
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
    getUserProfile,
    updateUserProfile,
    deleteUser,
};
