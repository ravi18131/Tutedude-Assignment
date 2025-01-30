import React, { useEffect, useState } from "react";
import FriendRequestCard from "./FriendRequestCard"; // Adjust the path accordingly
import { fetchDataFromApi, editData } from "../../utils/api";
import { useSnackbar } from "../../context/SnackbarProvider";
import { CircularProgress, Box, Typography, Grid } from "@mui/material";

const FriendRequests = () => {
    const [friendRequests, setFriendRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showSnackbar } = useSnackbar();
    const user = localStorage.getItem("user");
    const parseUserData = user ? JSON.parse(user) : null;

    // Fetch friend requests
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await fetchDataFromApi(`/api/friend-requests/${parseUserData.username}`);
                setFriendRequests(res.data);
            } catch (error) {
                showSnackbar("Failed to fetch friend requests.", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [showSnackbar]);

    // Handle accept/reject status change
    const changeStatus = async (id, status) => {
        try {
            const res = await editData(`/api/friend-requests/${id}`, {
                status,
            });

            // Update UI locally after success
            setFriendRequests((prevRequests) =>
                prevRequests.filter((request) => request.id !== id)
            );

            showSnackbar(res.message || `Friend request ${status}!`, "success");
        } catch (error) {
            showSnackbar("Failed to update request status.", "error");
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box  sx={{ mx: 4 }}>
            {friendRequests.length > 0 ? (
                <Grid container spacing={3}>
                    {friendRequests.map((request) => (
                        <Grid item xs={12} sm={6} md={4} key={request.id}>
                            <FriendRequestCard
                                item={request}
                                changeStatus={changeStatus}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="h6" align="center">
                    No friend requests available.
                </Typography>
            )}
        </Box>
    );
};

export default FriendRequests;