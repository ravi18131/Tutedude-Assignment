import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../.././../animations/lottie/recover-password.json";
import { useSnackbar } from "../../../context/SnackbarProvider";
import { postData } from "../../../utils/api";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import {
  Button,
  CircularProgress,
  TextField,
  Box,
  Typography,
  Card,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Logo from "../../../assets/images/logo.png";
import "./style.css";

const ForgotPasswordVerification = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const params = useParams();
  const { userId, uniqueString } = params;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setLoading(false);
      return;
    }

    // Prepare the form data as an object
    const formData = {
      userId,
      uniqueString,
      password,
      confirmPassword,
    };

    // Call postData with the correct formData
    postData("/auth/forgot-password/confirm", formData)
      .then((res) => {
        try {
          if (res.error !== true) {
            setTimeout(() => {
              setLoading(false);
              navigate("/signin");
            }, 2000);
          } else {
            setLoading(false);
            showSnackbar("An error occurred", "error", "#f1b9b9");
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
    <>
      <section className="loginSection">
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
                      sx={{
                        background: "rgba(0, 0, 0, 0.8)",
                        borderRadius: "50%",
                        border: "1px solid var(--borderColor)",
                      }}
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
                      Enter your new password
                    </Typography>
                  </Box>

                  <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                      label="Password"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      type={isShowPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setIsShowPassword(!isShowPassword)}
                            >
                              {isShowPassword ? <IoMdEyeOff /> : <IoMdEye />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      required
                    />

                    <TextField
                      label="Confirm Password"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      type={isShowConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setIsShowConfirmPassword(!isShowConfirmPassword)
                              }
                            >
                              {isShowConfirmPassword ? (
                                <IoMdEyeOff />
                              ) : (
                                <IoMdEye />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
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
                      Submit
                    </Button>
                  </Box>

                  <Box sx={{ textAlign: "center", mt: 2 }}>
                    <Typography variant="body2">
                      Back to{" "}
                      <Link to="/login">
                        <Button variant="text">Login</Button>
                      </Link>
                    </Typography>
                  </Box>
                </Card>
              </Box>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPasswordVerification;
