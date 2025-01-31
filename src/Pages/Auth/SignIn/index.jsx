import { useContext, useEffect, useState } from "react";
import Logo from "../../../assets/images/logo.png";
import { MyContext } from "../../../App";
import { NavLink, useNavigate } from "react-router-dom";
import "../style.css";
import { useSnackbar } from "../../../context/SnackbarProvider";
import {
  TextField,
  Card,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

import { postData } from "../../../utils/api";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSnackbar } = useSnackbar();
  const history = useNavigate();
  const navigate = useNavigate();

  const [formfields, setFormfields] = useState({
    email: "",
    password: "",
  });

  const navigateToHome = () => {
    navigate("/");
  };

  const onchangeInput = (e) => {
    setFormfields(() => ({
      ...formfields,
      [e.target.name]: e.target.value,
    }));
  };

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const parseUserData = JSON.parse(user);

  useEffect(() => {
    // Check if user is authenticated based on token stored in local storage
    if (token && parseUserData) {
      history("/");
    }
  }, [history]);

  const login = async (e) => {
    e.preventDefault();

    if (formfields.email === "") {
      showSnackbar("email can not be blank!", "error", "#f1b9b9");
      return false;
    }

    if (formfields.password === "") {
      showSnackbar("password can not be blank!", "error", "#f1b9b9");
      return false;
    }

    setIsLoading(true);

    try {
      const res = await postData("/api/user/signin", formfields);

      if (res.success !== false) {
        localStorage.setItem("token", res.token);

        const user = {
          username: res.user?.username,
          email: res.user?.email,
          userId: res.user?.id,
          avatar: res.user?.avatar || "",
        };

        localStorage.setItem("user", JSON.stringify(user));
        const msg = res.message || "Login successfully!!"
        showSnackbar(msg, "success", "#aadbaa");
        history("/");
      } else {
        const msg = res.message || "Something went wrong!!"
        showSnackbar(msg, "error", "#f1b9b9");
      }
    } catch (error) {
      const msg = error.message || "Internal srever error!!"
      showSnackbar(msg, "error", "#f1b9b9");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams) {
      const token = urlParams.get("token");
      const username = urlParams.get("username");
      const email = urlParams.get("email");
      const userId = urlParams.get("userId");
      const avatar = urlParams.get("avatar");

      if (token) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.setItem("token", token); // Save token to local storage
        localStorage.setItem(
          "user",
          JSON.stringify({ username, email, userId, avatar })
        ); // Save user data to local storage
        showSnackbar("Login Successful!!", "success", "#aadbaa");
        history("/");
      }
    }
  }, []);

  return (
    <Box component="section" className="section signInPage">
      <Box className="shape-bottom">
        {" "}
        <svg
          fill="#fff"
          id="Layer_1"
          x="0px"
          y="0px"
          viewBox="0 0 1921 819.8"
          style={{ enableBackground: "new 0 0 1921 819.8" }}
        >
          {" "}
          <path
            class="st0"
            d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4 c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"
          ></path>{" "}
        </svg>
      </Box>

      <Box className="container">
        <Card
          className="box"
          sx={{
            borderRadius: 2,
            boxShadow: 5,
            border: "1.5px solid var(--borderCool)",
            p: 3,
          }}
        >
          <Box className="text-center">
            <img
              src={Logo}
              width={70}
              height={70}
            />
          </Box>

          <form className="mt-3" onSubmit={login}>
            <Typography
              variant="h2"
              className="mb-4"
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "var(--textColor)",
              }}
            >
              Sign In
            </Typography>

            <Box className="form-group">
              <TextField
                id="standard-basic"
                label="Email/Username"
                type="text"
                required
                variant="standard"
                className="w-100"
                name="email"
                onChange={onchangeInput}
              />
            </Box>
            <Box className="form-group">
              <TextField
                id="standard-basic"
                label="Password"
                type="password"
                required
                variant="standard"
                className="w-100"
                name="password"
                onChange={onchangeInput}
              />
            </Box>

            <Box sx={{ textAlign: "right" }}>
              <NavLink
                to="/forgot-password"
                className="border-effect cursor txt"
              >
                Forgot Password?
              </NavLink>
            </Box>

            <Box
              className="d-flex align-items-center justify-content-between mt-3 mb-3"
              sx={{ gap: "1rem" }}
            >
              <Button type="submit" variant="contained" fullWidth size="large">
                {isLoading === true ? <CircularProgress /> : "Sign In"}
              </Button>
              <Button
                size="large"
                fullWidth
                variant="outlined"
                onClick={navigateToHome}
              >
                Cancel
              </Button>
            </Box>

            <Typography className="txt" sx={{ fontWeight: "500" }}>
              Don't have an account?{" "}
              <NavLink
                to="/signUp"
                className="border-effect"
                style={{ marginLeft: "4px" }}
              >
                Sign Up
              </NavLink>
            </Typography>
          </form>
        </Card>
      </Box>
    </Box>
  );
};

export default SignIn;
