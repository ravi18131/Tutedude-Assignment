import React from "react";
import { Box, Typography, Button, Avatar, Paper } from "@mui/material";

const RecommendationCard = ({
    item,
    mutualConnections,
    parseUserData,
    checkConnection,
    handleConnect,
}) => {
    return (
        <Box display="flex" justifyContent="center" mt={4}>
            <Paper
                sx={{
                    width: "350px",
                    height: "320px",
                    p: 3,
                    borderRadius: "0.5rem",
                    border: "1px solid var(--borderCool)",
                    background: "var(--bgLight)",
                }}
            >
                <Box display="flex" alignItems="center" mb={3}>
                    <Avatar
                        src={item?.profileDetails?.avatar || ""}
                        alt="avatar"
                        sx={{ width: 80, height: 80, mr: 2, border: "1px solid var(--borderCool)" }}
                    />
                    <Box>
                        <Typography variant="h6">{item.username}</Typography>
                        <Typography variant="body1" color="textSecondary">
                            {item?.profileDetails?.bio}
                        </Typography>
                    </Box>
                </Box>

                <Typography variant="body1">
                    <strong>Email:</strong> {item.email}
                </Typography>

                {item?.profileDetails?.hobbies && (
                    <Typography variant="body1">
                        <strong>Hobbies:</strong>{" "}
                        {item?.profileDetails?.hobbies.length > 0
                            ? item?.profileDetails?.hobbies.join(", ")
                            : "No hobbies listed."}
                    </Typography>
                )}

                {item?.profileDetails?.interests && (
                    <Typography variant="body1">
                        <strong>Interested:</strong>{" "}
                        {item?.profileDetails?.interests.length > 0
                            ? item?.profileDetails?.interests.join(", ")
                            : "No interests listed."}
                    </Typography>
                )}

                <Typography variant="body1">
                    <strong>Mutual Connections:</strong> {mutualConnections?.length || "0"}
                </Typography>

                {parseUserData?.username !== item.username ? (
                    checkConnection ? (
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 3 }}
                            disabled={true}
                        >
                            {checkConnection.status}
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 3 }}
                            onClick={() => handleConnect(item.username)}
                        >
                            Connect
                        </Button>
                    )
                ) : null}
            </Paper>
        </Box>
    );
};

export default RecommendationCard;