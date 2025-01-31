import React, { useState } from "react";
import {
  TextField,
  Card,
  Button,
  Container,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password don't match!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/user/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Password changed successfully. Please log in again.");
        navigate("/login");
      } else {
        setErrorMessage(data.message || "Something went wrong!");
      }
    } catch (error) {
      setErrorMessage("Error while changing password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          p: 2,
          backgroundColor: "var(--bgLight)",
          borderRadius: 2,
          boxShadow: 2,
          border: "1px solid var(--borderCool)",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          textAlign="center"
          gutterBottom
          sx={{
            fontSize: "1rem",
            fontWeight: "500",
            color: "var(--textHeading)",
          }}
        >
          Change Password
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Old Password Field */}
          <TextField
            fullWidth
            margin="normal"
            label="Old Password"
            type={showOldPassword ? "text" : "password"}
            variant="outlined"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle old password visibility"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    edge="end"
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* New Password Field */}
          <TextField
            fullWidth
            margin="normal"
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle new password visibility"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* Confirm Password Field */}
          <TextField
            fullWidth
            margin="normal"
            label="Confirm New Password"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {errorMessage && (
            <Alert severity="error" sx={{ marginY: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginY: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Change Password"}
          </Button>
        </form>
      </Card>
    </Container>
  );
}
