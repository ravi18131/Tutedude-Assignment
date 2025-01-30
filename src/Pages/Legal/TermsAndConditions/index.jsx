"use client";
import React, { useEffect, useState } from "react";
import {
    Typography,
    Box,
    CircularProgress,
    Link,
    Divider,
} from "@mui/material";

import { fetchDataFromApi } from "../../../utils/api";

const TermsAndConditionPage = () => {
    const [termsData, setTermsData] = useState(null); // Change to null instead of TypeScript interface

    useEffect(() => {

        const fetchTermsData = async () => {
            await fetchDataFromApi(`/api/terms-and-conditions/one`).then((res) => {
                setTermsData(res);
            });
        }

        fetchTermsData();
    }, []);

    if (!termsData) {
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
                    Loading Terms and Conditions...
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 8 }}>
            <Box sx={styles.banner}>
                <Typography variant="h1" component="h1" sx={styles.text}>
                    Terms & <span style={{ color: "#56d1ff" }}>Conditions</span>
                </Typography>
            </Box>

            <Box className="container" sx={{ marginTop: "2rem" }}>
                <Typography variant="subtitle1" gutterBottom>
                    <strong>Version:</strong> {termsData.version}
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                    <strong>Last Updated:</strong>{" "}
                    {new Date(termsData.updatedAt).toLocaleDateString()}
                </Typography>

                <Divider sx={{ my: 4 }} />

                <Typography
                    variant="body1"
                    gutterBottom
                    sx={{
                        textAlign: "justify",
                    }}
                >
                    {termsData.description}
                </Typography>

                <Divider sx={{ my: 4 }} />

                {termsData.sections?.map((section, index) => (
                    <Box key={index} sx={{ mb: 6 }}>
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
                                                                textAlign: "justify",
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

                {
                    termsData.document &&
                    <Box sx={{ mt: 5 }}>
                        <Link
                            href={termsData.document}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="body1"
                            color="primary"
                        >
                            View/Download Full Document
                        </Link>
                    </Box>
                }
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

export default TermsAndConditionPage;
