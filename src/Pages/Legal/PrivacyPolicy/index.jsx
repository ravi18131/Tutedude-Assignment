"use client";
import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Divider,
    Link,
    CircularProgress,
} from "@mui/material";
import { fetchDataFromApi } from "../../../utils/api";

const PrivacyPolicyPage = () => {
    const [policy, setPolicy] = useState(null); // Initialize to null

    useEffect(() => {
        const fetchPolicy = async () => {
            await fetchDataFromApi(`/api/privacy-policy/one`).then((res) => {
                setPolicy(res);
            });
        };

        fetchPolicy();
    }, []);

    if (!policy) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1.5rem",
                    width: "100%",
                    height: "100%",
                    minHeight: "90vh",
                }}
            >
                <CircularProgress size={40} />
                <Typography variant="h6" sx={{ mt: 2, color: "var(--textHeading)" }}>
                    Loading Privacy Policy...
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 8 }}>
            <Box sx={styles.banner}>
                <Typography variant="h1" component="h1" sx={styles.text}>
                    PRIVACY <span style={{ color: "#56d1ff" }}>POLICY</span>
                </Typography>
            </Box>

            <Box className="container" sx={{ marginTop: "2rem" }}>
                <Typography variant="subtitle1" gutterBottom>
                    <strong>Title:</strong> {policy.title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    <strong>Version:</strong> {policy.version}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    <strong>Last Updated:</strong>{" "}
                    {new Date(policy.updatedAt).toLocaleDateString()}
                </Typography>

                <Divider sx={{ my: 4 }} />

                <Typography
                    variant="h2"
                    gutterBottom
                    sx={{
                        color: "var(--textColor)",
                        fontSize: "1.25rem",
                        fontWeight: "500",
                        marginBottom: "2rem",
                    }}
                >
                    Your privacy is important to us.
                </Typography>

                <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                        textAlign: "justify",
                    }}
                >
                    {policy.description}
                </Typography>

                <Divider sx={{ my: 4 }} />

                {policy.sections?.map((section, index) => (
                    <Box key={index} mb={6}>
                        {/* section title */}
                        {section.title && (
                            <Typography
                                variant="h4"
                                gutterBottom
                                sx={{
                                    fontSize: "1.25rem",
                                    fontWeight: "500",
                                    color: "var(--textHeading)",
                                    textTransform: "uppercase",
                                    marginBottom: "1rem",
                                }}
                            >
                                {section.title}
                            </Typography>
                        )}

                        {/* section description */}
                        {section.description && (
                            <Typography
                                variant="body1"
                                sx={{
                                    textAlign: "justify",
                                    marginBottom: "1rem",
                                }}
                            >
                                {section.description}
                            </Typography>
                        )}

                        {/* section points */}
                        {section.points &&
                            section.points.length > 0 &&
                            section.points.map((point, i) => (
                                <Box key={i}>
                                    <Typography
                                        component="ul"
                                        sx={{
                                            listStyleType: "none",
                                            paddingLeft: "1.5rem",
                                            margin: 0,
                                        }}
                                    >
                                        {point.title && (
                                            <li
                                                style={{
                                                    position: "relative",
                                                    paddingLeft: "1.5rem",
                                                }}
                                            >
                                                <Box sx={{ marginBottom: "1rem" }}>
                                                    {point.title && (
                                                        <Typography
                                                            variant="body1"
                                                            component="span"
                                                            sx={{
                                                                color: point.description
                                                                    ? "var(--textColor)"
                                                                    : "var(--textLight)",
                                                                fontWeight: point.description
                                                                    ? "500"
                                                                    : "normal",
                                                                marginRight: "0.5rem",
                                                            }}
                                                        >
                                                            {point.title}
                                                        </Typography>
                                                    )}

                                                    {point.description && (
                                                        <Typography
                                                            variant="body1"
                                                            component="span"
                                                            sx={{
                                                                color: "var(--textLight)",
                                                                textAlign: "justify",
                                                            }}
                                                        >
                                                            {point.description}
                                                        </Typography>
                                                    )}
                                                </Box>

                                                <span
                                                    style={{
                                                        position: "absolute",
                                                        left: 0,
                                                        top: "0.4rem",
                                                        minWidth: "0.7rem",
                                                        minHeight: "0.7rem",
                                                        maxWidth: "0.7rem",
                                                        maxHeight: "0.7rem",
                                                        backgroundColor: "transparent",
                                                        border: "2px solid var(--primaryColor)",
                                                        borderRadius: "50%",
                                                    }}
                                                />
                                            </li>
                                        )}
                                    </Typography>
                                </Box>
                            ))}
                    </Box>
                ))}

                <Divider sx={{ my: 4 }} />

                <Typography
                    variant="h2"
                    sx={{
                        color: "var(--textColor)",
                        fontSize: "1.5rem",
                        fontWeight: "500",
                        marginBottom: "2rem",
                    }}
                    gutterBottom
                >
                    Provider Information
                </Typography>
                <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ color: "var(--textColor)" }}
                >
                    <strong>Company:</strong> {policy.provider?.name}
                </Typography>
                <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{ color: "var(--textColor)" }}
                >
                    <strong>Website:</strong>{" "}
                    <Link
                        href={policy.provider?.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                    >
                        {policy.provider?.website}
                    </Link>
                </Typography>
                {policy.provider?.logo && (
                    <Box
                        mt={4}
                        sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                    >
                        <img
                            src={policy.provider?.logo}
                            alt={policy.provider?.name}
                            style={{
                                background: "rgba(0, 0, 0, 0.8)", 
                                borderRadius: "50%"
                            }}
                            width="40"
                        />

                        <Typography
                            variant="h3"
                            sx={{
                                color: "var(--primaryColor)",
                                fontSize: "1rem",
                                fontWeight: "bold",
                            }}
                        >
                            Royal Beekeeper, Rajasthan
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

const styles = {
    banner: {
        width: "100%",
        height: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#343f44",
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: "2rem",
    },
};

export default PrivacyPolicyPage;
