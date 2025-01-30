const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    uniqueString: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }, // Define as Date type
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

userSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

userSchema.set("toJSON", {
    virtuals: true,
});

// exports.forgotPassword = mongoose.model("forgotPassword", userSchema);
// exports.userSchema = userSchema;

const forgotPassword = mongoose.model("forgotPassword", userSchema);
module.exports = forgotPassword;

