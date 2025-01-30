import { useEffect, useState } from "react";
import Logo from "../../../assets/images/logo.png";
import { useSnackbar } from "../../../context/SnackbarProvider";
import { NavLink } from "react-router-dom";
import "../style.css";

import {
  TextField,
  Card,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

import GoogleImg from "../../../assets/images/googleImg.png";
import { postData } from "../../../utils/api";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formfields, setFormfields] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const history = useNavigate();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const navigateToHome = () => {
    navigate("/");
  };

  const onchangeInput = (e) => {
    setFormfields(() => ({
      ...formfields,
      [e.target.name]: e.target.value,
    }));
  };

  const register = (e) => {
    e.preventDefault();
    try {
      if (formfields.name === "") {
        showSnackbar("name can not be blank!", "error", "#f1b9b9");
        return false;
      }

      if (formfields.email === "") {
        showSnackbar("email can not be blank!", "error", "#f1b9b9");
        return false;
      }

      if (formfields.phone === "") {
        showSnackbar("phone can not be blank!", "error", "#f1b9b9");
        return false;
      }

      if (formfields.password === "") {
        showSnackbar("password can not be blank!", "error", "#f1b9b9");
        return false;
      }

      setIsLoading(true);

      postData("/api/user/signup", formfields)
        .then((res) => {
          if (res.success !== false) {
            showSnackbar("Register Successfully!", "success", "#aadbaa");

            setTimeout(() => {
              setIsLoading(true);
              history("/signIn");
            }, 2000);
          } else {
            setIsLoading(false);
            const msg = res.message || "Internal srever error!!"
            // showSnackbar(msg, "error", "#f1b9b9");
          }
        })
        .catch((error) => {
          const msg = error.message || "Internal srever error!!"
          // showSnackbar(msg, "error", "#f1b9b9");
        });
    } catch (error) {
      const msg = error.message || "Internal srever error!!"
      // showSnackbar(msg, "error", "#f1b9b9");
    }
  };

  const handleGoogleLogin = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/google`, "_self");
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams) {
      const token = urlParams.get("token");
      const name = urlParams.get("name");
      const email = urlParams.get("email");
      const role = urlParams.get("role");
      const userId = urlParams.get("userId");
      const avatar = urlParams.get("avatar");

      if (token) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.setItem("token", token); // Save token to local storage
        localStorage.setItem(
          "user",
          JSON.stringify({ name, email, role, userId, avatar })
        ); // Save user data to local storage

        showSnackbar("Login Successful!", "success", "#aadbaa");
      }
    }
  }, []);

  useEffect(() => {
    // Check if user is authenticated based on token stored in local storage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    const parseUserData = JSON.parse(user);

    if (token && parseUserData) {
      if (parseUserData.role === "user") {
        history("/");
      } else if (parseUserData.role === "admin") {
        history("/admin/dashboard");
      }
    }
  }, [history]);

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
              style={{
                background: "rgba(0, 0, 0, 0.8)",
                borderRadius: "50%",
                border: "1px solid var(--borderColor)",
              }}
            />
          </Box>

          <form className="mt-2" onSubmit={register}>
            <Typography
              variant="h2"
              className="mb-4"
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "var(--textColor)",
              }}
            >
              Sign Up
            </Typography>

            <Box className="row">
              <Box className="col-md-6">
                <Box className="form-group">
                  <TextField
                    label="Name"
                    name="name"
                    onChange={onchangeInput}
                    type="text"
                    variant="standard"
                    className="w-100"
                  />
                </Box>
              </Box>

              <Box className="col-md-6">
                <Box className="form-group">
                  <TextField
                    label="Phone No."
                    name="phone"
                    onChange={onchangeInput}
                    type="text"
                    variant="standard"
                    className="w-100"
                  />
                </Box>
              </Box>
            </Box>

            <Box className="form-group">
              <TextField
                id="standard-basic"
                label="Email"
                type="email"
                name="email"
                onChange={onchangeInput}
                variant="standard"
                className="w-100"
              />
            </Box>
            <Box className="form-group">
              <TextField
                id="standard-basic"
                label="Password"
                name="password"
                onChange={onchangeInput}
                type="password"
                variant="standard"
                className="w-100"
              />
            </Box>

            <Box
              className="d-flex align-items-center justify-content-between mb-3"
              sx={{ gap: "1rem", mt: 4 }}
            >
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isLoading === true ? true : false}
              >
                {isLoading === true ? <CircularProgress /> : "Sign Up"}
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
              Already have an account?{" "}
              <NavLink
                to="/signIn"
                className="border-effect"
                style={{ marginLeft: "4px" }}
              >
                Login
              </NavLink>
            </Typography>
          </form>

          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              fontWeight: "500",
              color: "var(--textLight)",
              fontSize: "1rem",
              marginTop: "1.5rem",
              marginBottom: "0.25rem",
            }}
          >
            Or continue with Google
          </Typography>

          <Button
            className="loginWithGoogle mt-2"
            variant="outlined"
            fullWidth
            onClick={handleGoogleLogin}
          >
            <img src={GoogleImg} /> Sign In with Google
          </Button>
        </Card>
      </Box>
    </Box>
  );
};

export default SignUp;
