import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Divider,
    Link,
    CircularProgress,
} from "@mui/material";

const policy = {
    title: "FriendHive Privacy Policy",
    version: "1.0",
    updatedAt: new Date().toISOString(),
    description: "At FriendHive, we prioritize your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information while using our platform.",
    sections: [
        {
            title: "Information We Collect",
            description: "We collect the following types of information to provide a better experience on FriendHive:",
            points: [
                {
                    title: "Account Information",
                    description: "Includes your name, email address, username, and profile details when you register or update your profile."
                },
                {
                    title: "User-Generated Content",
                    description: "Includes the posts, messages, and comments you share on FriendHive."
                },
                {
                    title: "Usage Data",
                    description: "We collect information on how you interact with our platform, such as pages visited, features used, and session length."
                },
                {
                    title: "Device Information",
                    description: "Details like IP address, device type, browser version, and operating system."
                }
            ]
        },
        {
            title: "How We Use Your Information",
            description: "We use your information to improve and provide our services:",
            points: [
                {
                    title: "Personalization",
                    description: "To recommend friends, content, and communities tailored to your interests."
                },
                {
                    title: "Communication",
                    description: "To send you important notifications, updates, and promotional materials."
                },
                {
                    title: "Safety and Security",
                    description: "To protect your account and ensure the safety of our community by monitoring for fraudulent or harmful activities."
                }
            ]
        },
        {
            title: "Sharing Your Information",
            description: "We respect your privacy and share information only when necessary:",
            points: [
                {
                    title: "With Other Users",
                    description: "Your profile information (e.g., username, bio) is visible to other users."
                },
                {
                    title: "Third-Party Services",
                    description: "We may share data with trusted third parties, such as analytics providers or payment processors, in compliance with legal and security requirements."
                },
                {
                    title: "Legal Compliance",
                    description: "When required by law, we may disclose your information to legal authorities."
                }
            ]
        },
        {
            title: "Your Rights",
            description: "You have the following rights regarding your personal data:",
            points: [
                {
                    title: "Access and Correction",
                    description: "You can view and update your personal data through your account settings."
                },
                {
                    title: "Data Portability",
                    description: "Request a copy of your data in a portable format."
                },
                {
                    title: "Account Deletion",
                    description: "Request to permanently delete your account and associated data."
                }
            ]
        },
        {
            title: "Data Security",
            description: "We implement robust measures to protect your data from unauthorized access or misuse. However, no system is completely secure, and we recommend safeguarding your account credentials."
        },
        {
            title: "Changes to This Policy",
            description: "We may update this Privacy Policy from time to time to reflect changes in our practices. We encourage you to review this page periodically."
        }
    ],
    provider: {
        name: "FriendHive",
        website: "https://www.friendhive.com",
        logo: "/"
    }
};

const PrivacyPolicyPage = () => {

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
