const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const http = require('http');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User");
const { sendVerificationEmail } = require('./controllers/authController')
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: true,
}));

// Initialize Passport and Session
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration for Google OAuth
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.SERVER_BASE_URL}/auth/google/callback`
},
  async (accessToken, refreshToken, profile, done) => {
    // Check if the user exists in MongoDB
    const { email, name, picture } = profile._json;

    let existingUser = await User.findOne({ email });

    if (!existingUser) {
      existingUser = new User({
        email: email,
        name: name,
        avatar: picture,
        provider: profile.provider,
      });

      const createdUser = await existingUser.save();

      const sendVerification = await sendVerificationEmail(createdUser);

    } else {
      existingUser.avatar = picture || existingUser.avatar;
      await existingUser.save();
    }

    // Generate a JWT token
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JSON_WEB_TOKEN_SECRET_KEY,
      // { expiresIn: '1h' } // Adjust token expiry as needed
    );

    done(null, { token, user: existingUser });
  }
));

// Serialize and Deserialize user for session
passport.serializeUser((user, done) => {
  done(null, user.user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return done(new Error('User not found'));
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});


//testing
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

const authRouter = require("./routes/authRoute.js")
const userRoutes = require("./routes/userRoutes")
const friendRequestRoutes = require("./routes/friendRequestRoutes.js")
const searchRoutes = require("./routes/searchRoute.js");
const recommendationRoute = require("./routes/recommendationRoute.js");

//Routes
app.use("/auth", authRouter);
app.use("/api/user", userRoutes);
app.use("/api/friend-requests", friendRequestRoutes);
app.use(`/api/search`, searchRoutes);
app.use(`/api/recommendations`, recommendationRoute);

//Database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully!");
    //Server
    app.listen(process.env.PORT, () => {
      console.log(`server is running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;

