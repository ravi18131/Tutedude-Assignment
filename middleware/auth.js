const jwt = require("jsonwebtoken");
const userModel = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token is present in the Authorization header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No token provided in the Authorization header.");
    return res.status(401).json({
      success: false,
      message: "Not Authorized, Please Login Again.",
    });
  }

  const token = authHeader.split(" ")[1]; // Extract the token

  try {
    // Verify the JWT token
    const decodedToken = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET_KEY);

    // Attach the user ID to the request object
    req.user = { id: decodedToken.id };  // Now req.user will have the user's ID

    // Fetch the user from the database
    const user = await userModel.findById(decodedToken.id);

    // If user does not exist, respond with 401 Unauthorized
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized, User Not Found.",
      });
    }

    // User is authenticated, proceed to next middleware
    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);

    // Handle JWT-specific errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expired, please log in again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token, please log in again.",
      });
    }

    // Generic error response
    res.status(500).json({
      success: false,
      message: "Internal server error in auth middleware.",
    });
  }
};

module.exports = authMiddleware;
