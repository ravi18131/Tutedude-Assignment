import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  TextField,
  Avatar,
  Container,
  CircularProgress,
  Grid,
  Paper,
} from "@mui/material";

const AdminProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const fileInputRef = useRef(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    email: "",
    phone: "",
    profile: {
      firstName: "",
      lastName: "",
      bio: "",
      avatar: null,
    },
  });

  useEffect(() => {
    if (username) {
      const fetchProfileData = async () => {
        try {
          const response = await axios.get(`/api/user/${username}`);
          const profile = response.data;

          setProfileData(profile);
          setUpdatedData({
            email: profile.email,
            phone: profile.phone,
            profile: {
              firstName: profile.profile.firstName,
              lastName: profile.profile.lastName,
              bio: profile.profile.bio,
              avatar: profile.profile.avatar,
            },
          });
        } catch (error) {
          console.error("Error fetching profile data", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProfileData();
    }
  }, [username]);

  const handleEditProfile = () => {
    setEdit(true);
  };

  const handleChangePassword = () => {
    navigate("/user/change-password");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (["firstName", "lastName", "bio"].includes(name)) {
      setUpdatedData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          [name]: value,
        },
      }));
    } else {
      setUpdatedData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUpdatedData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          avatar: e.target.files[0],
        },
      }));
      setSelectedFileName(e.target.files[0].name);
    }
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const formData = new FormData();
    formData.append("firstName", updatedData.profile.firstName);
    formData.append("lastName", updatedData.profile.lastName);
    formData.append("email", updatedData.email);
    formData.append("phone", updatedData.phone);
    formData.append("bio", updatedData.profile.bio);

    if (updatedData.profile.avatar instanceof File) {
      formData.append("avatar", updatedData.profile.avatar);
    } else if (typeof updatedData.profile.avatar === "string") {
      formData.append("avatar", updatedData.profile.avatar);
    }

    try {
      const response = await axios.patch(`/api/user/${username}`, formData);

      if (!response.status === 200) {
        throw new Error("Error updating profile");
      }

      alert("Profile updated successfully!");
      setProfileData(response.data);
      setEdit(false);
    } catch (error) {
      console.error("Error updating profile!", error);
      alert("Error updating profile!");
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setEdit(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!profileData) {
    return <Typography>Error loading profile data</Typography>;
  }

  return (
    <Container maxWidth="sm">
      {edit ? (
        <Paper
          sx={{
            p: 3,
            borderRadius: "0.5rem",
            border: "1px solid var(--borderCool)",
            background: "var(--bgLight)",
          }}
        >
          <Typography
            variant="h5"
            mb={3}
            sx={{
              fontSize: "1rem",
              fontWeight: "500",
              color: "var(--textHeading)",
            }}
          >
            Edit Profile
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} textAlign="center">
                <Box textAlign="center">
                  <Avatar
                    src={
                      updatedData.profile.avatar
                        ? typeof updatedData.profile.avatar === "string"
                          ? updatedData.profile.avatar
                          : URL.createObjectURL(updatedData.profile.avatar)
                        : undefined
                    }
                    alt="avatar"
                    sx={{ width: 80, height: 80, margin: "0 auto" }}
                  />

                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />

                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleFileClick}
                    sx={{ mt: 2 }}
                  >
                    Select Profile Photo
                  </Button>

                  {selectedFileName && (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mt: 1 }}
                    >
                      Selected file: {selectedFileName}
                    </Typography>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={updatedData.profile.firstName}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={updatedData.profile.lastName}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={updatedData.email}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={updatedData.phone}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  value={updatedData.profile.bio}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={updating}
                >
                  {updating ? "Saving..." : "Save Changes"}
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Button
                  onClick={handleCancel}
                  variant="outlined"
                  color="secondary"
                  fullWidth
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      ) : (
        <Paper
          sx={{
            p: 3,
            borderRadius: "0.5rem",
            border: "1px solid var(--borderCool)",
            background: "var(--bgLight)",
          }}
        >
          <Box display="flex" alignItems="center" mb={3}>
            <Avatar
              src={
                typeof profileData.profile.avatar === "string"
                  ? profileData.profile.avatar
                  : undefined
              }
              alt="avatar"
              sx={{
                width: 80,
                height: 80,
                mr: 2,
                border: "1px solid var(--borderCool)",
              }}
            />
            <Box>
              <Typography variant="h6">
                {profileData.profile.firstName} {profileData.profile.lastName}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {profileData.profile.bio}
              </Typography>
            </Box>
          </Box>

          <Typography variant="body1">
            <strong>Email:</strong> {profileData.email}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong>{" "}
            {profileData.phone ? profileData.phone : "N/A"}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleEditProfile}
          >
            Edit Profile
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleChangePassword}
          >
            Change Password
          </Button>
        </Paper>
      )}
    </Container>
  );
};

export default AdminProfilePage;
