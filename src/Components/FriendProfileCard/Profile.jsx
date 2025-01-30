import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import { useSnackbar } from "../../context/SnackbarProvider";
import {
    Box,
    Typography,
    Button,
    Avatar,
    Container,
    CircularProgress,
    Paper,
} from "@mui/material";

const FriendProfile = () => {
    const { username } = useParams();
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState(null);
    const fileInputRef = useRef(null);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        if (username) {
            const fetchProfileData = async () => {
                try {
                    console.log("Fetching user data for username:", username);
                    const response = await fetchDataFromApi(`/api/user/${username}`);
                    console.log("User fetched successfully:", response);
                    setProfileData(response); // Use the response directly
                } catch (error) {
                    const msg = error.message || "Internal server error!!";
                    showSnackbar(msg, "error", "#f1b9b9");
                    console.error("Error fetching profile data:", error);
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

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;

    //     if (["firstName", "lastName", "bio"].includes(name)) {
    //         setUpdatedData((prev) => ({
    //             ...prev,
    //             profile: {
    //                 ...prev.profile,
    //                 [name]: value,
    //             },
    //         }));
    //     } else {
    //         setUpdatedData((prev) => ({
    //             ...prev,
    //             [name]: value,
    //         }));
    //     }
    // };

    // const handleFileChange = (e) => {
    //     if (e.target.files && e.target.files[0]) {
    //         setUpdatedData((prev) => ({
    //             ...prev,
    //             profile: {
    //                 ...prev.profile,
    //                 avatar: e.target.files[0],
    //             },
    //         }));
    //         setSelectedFileName(e.target.files[0].name);
    //     }
    // };


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

    const user = localStorage.getItem("user");

    const parseUserData = JSON.parse(user);

    return (
        <Container maxWidth="sm">

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
                        src={profileData?.profileDetails?.avatar ? profileData?.profileDetails?.avatar : ""}
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
                            {profileData.username}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            {profileData?.profileDetails?.bio}
                        </Typography>
                    </Box>
                </Box>

                <Typography variant="body1">
                    <strong>Email:</strong> {profileData.email}
                </Typography>

                {
                    profileData.profileDetails.hobbies &&
                    (
                        <>
                            <Typography variant="body1">
                                <strong>Hobbies:</strong>{" "}
                                {profileData.profileDetails.hobbies.length > 0
                                    ? profileData.profileDetails.hobbies.join(", ")
                                    : "No hobbies listed."}
                            </Typography>
                        </>
                    )
                }

                {
                    profileData.profileDetails.interests &&
                    (
                        <>
                            <Typography variant="body1">
                                <strong>Interested:</strong>{" "}
                                {profileData.profileDetails.interests.length > 0
                                    ? profileData.profileDetails.interests.join(", ")
                                    : "No interest listed."}
                            </Typography>
                        </>
                    )
                }

                <Typography variant="body1">
                    <strong>Connections:</strong>{" "}
                    {profileData?.phone ? profileData?.phone : "0"}
                </Typography>

                <Typography variant="body1">
                    <strong>Mutual Connections:</strong>{" "}
                    {profileData?.phone ? profileData?.phone : "N/A"}
                </Typography>
                {
                    parseUserData.username != profileData.username &&
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3 }}
                        onClick={handleEditProfile}
                    >
                        Connect
                    </Button>
                }

            </Paper>
        </Container>
    );
};

export default FriendProfile;