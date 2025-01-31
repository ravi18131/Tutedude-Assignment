import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../../animations/lottie/forgot-password.json";
import { useSnackbar } from "../../../context/SnackbarProvider";
import {
  Button,
  CircularProgress,
  TextField,
  Box,
  Typography,
  Card,
} from "@mui/material";
import { postData } from "../../../utils/api";
import Logo from "../../../assets/images/logo.png";

import "./index.css";

const ForgotPassword = () => {
  const navigate = useNavigate(); // Replaces useRouter in Next.js
  const { showSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = { email }; // Wrap email in an object

    postData("/auth/forgot-password", formData)
      .then((res) => {
        try {
          if (res.error !== true) {
            alert("Password reset link sent to your email");
            setTimeout(() => {
              setLoading(false);
              navigate("/signin");
            }, 2000);
          } else {
            setLoading(false);
            alert(res.error || "An error occurred"); // Optional: Handle the error message
          }
        } catch (error) {
          const msg = error.message || "Internal srever error!!"
          // showSnackbar(msg, "error", "#f1b9b9");
          setLoading(false);
        }
      })
      .catch((error) => {
        const msg = error.message || "Internal srever error!!"
        // showSnackbar(msg, "error", "#f1b9b9");
        setLoading(false);
      });
  };

  return (
    <section className="loginSection section">
      <div className="container">
        <div className="row reset-password">
          <div className="col-12 col-xl-6 col-lg-6 col-md-12 left">
            <Box
              component="section"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                height: "100%",
                width: "100%",
              }}
            >
              <figure className="lottie-animation">
                <Lottie
                  loop={true}
                  animationData={animationData}
                  className="animation"
                />
              </figure>
            </Box>
          </div>

          <div className="col-12 col-xl-6 col-lg-6 col-md-12">
            <Box
              component="section"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                height: "100%",
                width: "100%",
              }}
            >
              <Card
                sx={{
                  p: 3,
                  width: "100%",
                  background: "#f0f0f0",
                  borderRadius: "8px",
                  border: "1px solid #ced4da",
                }}
              >
                <Box
                  sx={{ textAlign: "center", mb: 1 }}
                  className="reset-password-logo"
                >
                  <Box
                    component="img"
                    src={Logo}
                    alt="Logo"
                    width={70}
                    height={70}
                  />
                  <Typography
                    variant="h1"
                    sx={{
                      mt: 1,
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: "var(--primaryColor)",
                    }}
                  >
                    Forgot Password
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      mt: 1,
                      fontSize: "1rem",
                      fontWeight: "500",
                      color: "var(--textLight)",
                    }}
                  >
                    Enter your email to recover password
                  </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    label="Email"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    size="large"
                    sx={{ mt: 1 }}
                    endIcon={loading ? <CircularProgress size={20} /> : null}
                  >
                    Reset Password
                  </Button>
                </Box>

                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Typography variant="body2">
                    Don't have an account?{" "}
                    <Button variant="text" onClick={() => navigate("/signUp")}>
                      Register
                    </Button>
                  </Typography>
                </Box>
              </Card>
            </Box>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
