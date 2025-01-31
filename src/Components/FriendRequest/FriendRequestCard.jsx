import React from "react";
import { Box, Typography, Button, Avatar, Paper } from "@mui/material";

const FriendRequestCard = ({ item, changeStatus }) => {
    return (
        <Box display="flex" justifyContent="center" mt={4}>
            <Paper
                sx={{
                    p: 2,
                    borderRadius: "0.5rem",
                    border: "1px solid var(--borderCool)",
                    background: "var(--bgLight)",
                    maxWidth: "400px", // Limit the width of the card
                    overflow: "hidden", // Ensure no content escapes the card
                    textOverflow: "ellipsis", // Handle text overflow gracefully
                }}
            >
                <Box display="flex" alignItems="center" mb={3}>
                    <Avatar
                        src={item?.sender?.profileDetails?.avatar || ""}
                        alt="avatar"
                        sx={{
                            width: 80,
                            height: 80,
                            mr: 2,
                            border: "1px solid var(--borderCool)",
                            flexShrink: 0, // Prevent shrinking of the avatar
                        }}
                    />
                    <Box>
                        <Typography 
                            variant="h6" 
                            noWrap // Ensure the username does not overflow
                        >
                            {item.sender?.username}
                        </Typography>
                        <Typography 
                            variant="body1" 
                            color="textSecondary" 
                            sx={{ 
                                overflow: "hidden", 
                                textOverflow: "ellipsis", 
                                whiteSpace: "nowrap", // Prevent text wrapping
                                maxWidth: "300px", // Adjust as needed
                            }}
                        >
                            {item?.sender?.profileDetails?.bio}
                        </Typography>
                    </Box>
                </Box>

                <Typography 
                    variant="body1" 
                    sx={{
                        overflow: "hidden", 
                        textOverflow: "ellipsis", 
                        whiteSpace: "nowrap",
                    }}
                >
                    <strong>Email:</strong> {item.sender?.email}
                </Typography>

                {item?.sender?.profileDetails?.hobbies && (
                    <Typography 
                        variant="body1" 
                        sx={{
                            overflow: "hidden", 
                            textOverflow: "ellipsis", 
                            whiteSpace: "nowrap",
                        }}
                    >
                        <strong>Hobbies:</strong>{" "}
                        {item?.sender?.profileDetails?.hobbies.length > 0
                            ? item?.sender?.profileDetails?.hobbies.join(", ")
                            : "No hobbies listed."}
                    </Typography>
                )}

                {item?.sender?.profileDetails?.interests && (
                    <Typography 
                        variant="body1" 
                        sx={{
                            overflow: "hidden", 
                            textOverflow: "ellipsis", 
                            whiteSpace: "nowrap",
                        }}
                    >
                        <strong>Interested:</strong>{" "}
                        {item?.sender?.profileDetails?.interests.length > 0
                            ? item?.sender?.profileDetails?.interests.join(", ")
                            : "No interests listed."}
                    </Typography>
                )}

                {/* Action Buttons */}
                <Box display="flex" justifyContent="space-between" mt={3}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => changeStatus(item.id, "Accepted")}
                    >
                        Accept
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => changeStatus(item.id, "Rejected")}
                    >
                        Reject
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default FriendRequestCard;