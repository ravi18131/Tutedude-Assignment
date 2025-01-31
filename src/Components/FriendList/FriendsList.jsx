import React, { useEffect, useState } from "react";
import FriendsListCard from "./FriendsListCard"; // Adjust the path accordingly
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
                const res = await fetchDataFromApi(`/api/friend-requests/friends-list/${parseUserData.username}`);
                setFriendRequests(res.data);
            } catch (error) {
                showSnackbar("Failed to fetch friend requests.", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [showSnackbar]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box  sx={{ mx: 12 }}>
            {friendRequests.length > 0 ? (
                <Grid container spacing={2}>
                    {friendRequests.map((request) => (
                        <Grid item xs={12} sm={4} md={6} key={request.id}>
                            <FriendsListCard
                                item={request}
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