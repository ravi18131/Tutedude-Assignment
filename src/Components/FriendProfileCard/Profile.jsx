import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi, postData } from "../../utils/api";
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
    const [profileData, setProfileData] = useState(null);
    const [checkConnection, setCheckConnection] = useState(null);
    const [mutualConnections, setMutualConnections] = useState(null);
    const [loading, setLoading] = useState(true);
    const { showSnackbar } = useSnackbar();

    const user = localStorage.getItem("user");
    const parseUserData = user ? JSON.parse(user) : null; // Ensure parseUserData is safely parsed

    // Fetch profile data
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
    }, [username]); // Only depend on username for profile data fetching

    // Fetch connection status based on sender (parseUserData) and receiver (username)
    useEffect(() => {
        if (username && parseUserData?.username) {
            const fetchRequest = async () => {
                try {
                    console.log("Fetching connection status for receiver:", username, "and sender:", parseUserData.username);

                    // Construct query parameters for the request
                    const queryParams = new URLSearchParams({
                        sender: parseUserData.username,
                        receiver: username,
                    }).toString(); // Prepare the query string

                    const response = await fetchDataFromApi(`/api/friend-requests/check-connection?${queryParams}`);
                    console.log("Connection status fetched successfully:", response);
                    setCheckConnection(response); // Use the response directly
                } catch (error) {
                    const msg = error.message || "Internal server error!!";
                    showSnackbar(msg, "error", "#f1b9b9");
                    console.error("Error fetching connection status:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchRequest();
        }

        const fetchMutualConnections = async () => {
            try {
                const response = await fetchDataFromApi(`/api/friend-requests/mutual-connections?sender=${parseUserData.username}&receiver=${username}`);
                console.log("Mutual connections:", response);
                setMutualConnections(response);
            } catch (error) {
                console.error("Error fetching mutual connections:", error);
            }
        };
        fetchMutualConnections();
    }, [username, parseUserData?.username]); // Only trigger when username or parseUserData.username changes

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

    const handleConnect = async (e) => {
        e.preventDefault();

        if (!parseUserData?.username) {
            showSnackbar("Signin first for connection!", "error", "#f1b9b9");
            return;
        }

        if (!profileData?.username) {
            showSnackbar("Friend not exist!", "error", "#f1b9b9");
            return;
        }

        try {
            const res = await postData("/api/friend-requests", { sender: parseUserData.username, receiver: profileData.username });

            const msg = res.success !== false ? res.message || "Request sent successfully!" : res.message || "Something went wrong!";
            showSnackbar(msg, res.success !== false ? "success" : "error", res.success !== false ? "#aadbaa" : "#f1b9b9");
        } catch (error) {
            const msg = error.message || "Internal server error!!";
            showSnackbar(msg, "error", "#f1b9b9");
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper sx={{ p: 3, borderRadius: "0.5rem", border: "1px solid var(--borderCool)", background: "var(--bgLight)" }}>
                <Box display="flex" alignItems="center" mb={3}>
                    <Avatar
                        src={profileData?.profileDetails?.avatar || ""}
                        alt="avatar"
                        sx={{ width: 80, height: 80, mr: 2, border: "1px solid var(--borderCool)" }}
                    />
                    <Box>
                        <Typography variant="h6">{profileData.username}</Typography>
                        <Typography variant="body1" color="textSecondary">{profileData?.profileDetails?.bio}</Typography>
                    </Box>
                </Box>

                <Typography variant="body1"><strong>Email:</strong> {profileData.email}</Typography>

                {profileData?.profileDetails?.hobbies && (
                    <Typography variant="body1">
                        <strong>Hobbies:</strong> {profileData?.profileDetails?.hobbies.length > 0 ? profileData?.profileDetails?.hobbies.join(", ") : "No hobbies listed."}
                    </Typography>
                )}

                {profileData?.profileDetails?.interests && (
                    <Typography variant="body1">
                        <strong>Interested:</strong> {profileData?.profileDetails?.interests.length > 0 ? profileData?.profileDetails?.interests.join(", ") : "No interests listed."}
                    </Typography>
                )}

                <Typography variant="body1"><strong>Mutual Connections:</strong> {mutualConnections?.length || "0"}</Typography>

                {
                    parseUserData?.username !== profileData.username ? (
                        checkConnection ? (
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 3 }}
                                disabled="true"
                            >
                                {checkConnection.status}
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 3 }}
                                onClick={handleConnect}
                            >
                                Connect
                            </Button>
                        )
                    ) : (
                        <></>
                    )
                }
            </Paper>
        </Container >
    );
};

export default FriendProfile;