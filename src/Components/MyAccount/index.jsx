import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import { useSnackbar } from "../../context/SnackbarProvider";
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
  Chip,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
const BaseUrl = process.env.REACT_APP_API_URL;

const AdminProfilePage = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const parseUserData = JSON.parse(user);
  const [profileData, setProfileData] = useState(null);
  const fileInputRef = useRef(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    email: "",
    username: "",
    profileDetails: {
      avatar: null,
      hobbies: [],
      interests: [],
      bio: "",
    },
  });
  const { showSnackbar } = useSnackbar();
  useEffect(() => {
    if (parseUserData.username) {
      const fetchProfileData = async () => {
        try {
          const response = await fetchDataFromApi(`/api/user/${parseUserData.username}`);
          const profile = response;

          setProfileData(profile);
          setUpdatedData({
            email: profile.email,
            username: profile.username,
            profileDetails: {
              avatar: profile.profileDetails.avatar || "",
              hobbies: profile.profileDetails.hobbies || [],
              interests: profile.profileDetails.interests || [],
              bio: profile.profileDetails.bio || "",
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
  }, [parseUserData.username]);

  const handleEditProfile = () => setEdit(true);
  const handleChangePassword = () => navigate("/user/change-password");
  const handleCancel = () => setEdit(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      profileDetails: {
        ...prev.profileDetails,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUpdatedData((prev) => ({
        ...prev,
        profileDetails: {
          ...prev.profileDetails,
          avatar: e.target.files[0],
        },
      }));
    }
  };

  const handleFileClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleAddToArray = (field) => {
    setUpdatedData((prev) => ({
      ...prev,
      profileDetails: {
        ...prev.profileDetails,
        [field]: [...prev.profileDetails[field], ""],
      },
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setUpdatedData((prev) => ({
      ...prev,
      profileDetails: {
        ...prev.profileDetails,
        [field]: prev.profileDetails[field].map((item, i) =>
          i === index ? value : item
        ),
      },
    }));
  };

  const handleRemoveFromArray = (field, index) => {
    setUpdatedData((prev) => ({
      ...prev,
      profileDetails: {
        ...prev.profileDetails,
        [field]: prev.profileDetails[field].filter((_, i) => i !== index),
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const formData = new FormData();
    formData.append("email", updatedData.email);
    formData.append("username", updatedData.username);
    formData.append("bio", updatedData.profileDetails.bio);
    formData.append("hobbies", JSON.stringify(updatedData.profileDetails.hobbies));
    formData.append("interests", JSON.stringify(updatedData.profileDetails.interests));

    if (updatedData.profileDetails.avatar instanceof File) {
      formData.append("avatar", updatedData.profileDetails.avatar);
    }

    try {
      const response = await axios.patch(`${BaseUrl}/api/user/${parseUserData.username}`, formData);
      if (response.success !== false) {
        showSnackbar("Profile updated successfully!", "success", "#aadbaa");
        setProfileData(response.data.data);
        setEdit(false);
      } else {
        const msg = response.message || "Internal server error!!";
        showSnackbar(msg, "error", "#f1b9b9");
      }
    } catch (error) {
      const msg = error.message || "Internal server error!!";
      showSnackbar(msg, "error", "#f1b9b9");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      {edit ? (
        <Paper sx={{ p: 3, borderRadius: "0.5rem", border: "1px solid #ccc" }}>
          <Typography variant="h5" mb={3}>
            Edit Profile
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} textAlign="center">
                <Avatar
                  src={
                    updatedData.profileDetails.avatar
                      ? typeof updatedData.profileDetails.avatar === "string"
                        ? updatedData.profileDetails.avatar
                        : URL.createObjectURL(updatedData.profileDetails.avatar)
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
                <Button variant="outlined" color="primary" onClick={handleFileClick} sx={{ mt: 2 }}>
                  Select Profile Photo
                </Button>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  value={updatedData.profileDetails.bio}
                  onChange={handleInputChange}
                  multiline
                />
              </Grid>

              {["hobbies", "interests"].map((field) => (
                <Grid item xs={12} key={field}>
                  <Typography>{field.charAt(0).toUpperCase() + field.slice(1)}:</Typography>
                  {updatedData.profileDetails[field].map((item, index) => (
                    <Box display="flex" alignItems="center" mb={1} key={index}>
                      <TextField
                        value={item}
                        onChange={(e) => handleArrayChange(field, index, e.target.value)}
                        fullWidth
                        size="small"
                      />
                      <IconButton onClick={() => handleRemoveFromArray(field, index)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    startIcon={<Add />}
                    onClick={() => handleAddToArray(field)}
                    sx={{ mt: 1 }}
                  >
                    Add {field.slice(0, -1)}
                  </Button>
                </Grid>
              ))}

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={updating}>
                  {updating ? "Saving..." : "Save Changes"}
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Button onClick={handleCancel} variant="outlined" color="secondary" fullWidth>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      ) : (
        <Paper sx={{ p: 3, borderRadius: "0.5rem", border: "1px solid #ccc" }}>
          <Box display="flex" alignItems="center" mb={3}>
            <Avatar
              src={
                typeof profileData?.profileDetails?.avatar === "string"
                  ? profileData?.profileDetails?.avatar
                  : undefined
              }
              alt="avatar"
              sx={{ width: 80, height: 80, mr: 2 }}
            />
            <Box>
              <Typography variant="h6">{profileData?.username}</Typography>
              <Typography variant="body1" color="textSecondary">
                {profileData?.profileDetails?.bio || "No bio available"}
              </Typography>
            </Box>
          </Box>

          <Typography variant="body1">
            <strong>Email:</strong> {profileData?.email}
          </Typography>
          <Typography variant="body1">
            <strong>Hobbies:</strong> {profileData?.profileDetails?.hobbies.join(", ") || "N/A"}
          </Typography>
          <Typography variant="body1">
            <strong>Interests:</strong> {profileData?.profileDetails?.interests.join(", ") || "N/A"}
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