const FriendRequest = require("../models/FriendRequest");
const User = require("../models/User");

//Recommondation system
const recommendFriends = async (username) => {
    try {
        const recommendations = await FriendRequest.aggregate([
            {
                // Match all accepted friendships for the logged-in user
                $match: {
                    status: "accepted",
                    $or: [
                        { sender: username }, // User is the sender
                        { receiver: username }, // User is the receiver
                    ],
                },
            },
            {
                // Identify the direct friends of the logged-in user
                $project: {
                    friend: {
                        $cond: [
                            { $eq: ["$sender", username] },
                            "$receiver",
                            "$sender",
                        ],
                    },
                },
            },
            {
                // Find mutual friends by looking up connections for each friend
                $lookup: {
                    from: "friendrequests",
                    localField: "friend", // Direct friend of the logged-in user
                    foreignField: "sender", // Check this friend's connections
                    pipeline: [
                        { $match: { status: "accepted" } }, // Only accepted friendships
                        {
                            $project: {
                                friend: "$receiver", // The mutual friend
                            },
                        },
                    ],
                    as: "mutualFriends",
                },
            },
            {
                // Flatten the mutual friends array
                $unwind: "$mutualFriends",
            },
            {
                // Exclude users who are already friends with the logged-in user
                $match: {
                    "mutualFriends.friend": { $ne: username },
                },
            },
            {
                // Group by mutual friend ID to remove duplicates
                $group: {
                    _id: "$mutualFriends.friend",
                    count: { $sum: 1 }, // Count the number of mutual connections
                },
            },
            {
                // Sort recommendations by the number of mutual friends (descending order)
                $sort: { count: -1 },
            },
        ]);

        return recommendations;
    } catch (error) {
        console.error("Error recommending friends:", error);
        throw new Error("Error recommending friends");
    }
};

const recommendFriendsByInterests = async (username) => {
    try {
        const userProfile = await User.findOne({ username });

        if (!userProfile) {
            throw new Error("User profile not found");
        }

        // Find users who have at least one common interest or hobby
        const recommendations = await User.aggregate([
            {
                $match: {
                    username: { $ne: username }, // Exclude the logged-in user
                },
            },
            {
                $project: {
                    commonInterests: {
                        $setIntersection: [
                            "$interests", // User's interests
                            userProfile.interests, // Logged-in user's interests
                        ],
                    },
                    commonHobbies: {
                        $setIntersection: [
                            "$hobbies", // User's hobbies
                            userProfile.hobbies, // Logged-in user's hobbies
                        ],
                    },
                },
            },
            {
                $match: {
                    $or: [
                        { "commonInterests.0": { $exists: true } }, // If common interests exist
                        { "commonHobbies.0": { $exists: true } }, // If common hobbies exist
                    ],
                },
            },
            {
                $project: {
                    username: 1,
                    commonInterests: 1,
                    commonHobbies: 1,
                },
            },
        ]);

        return recommendations;
    } catch (error) {
        console.error("Error fetching users with common interests:", error);
        throw new Error("Error finding users with common interests");
    }
};

const getFriendRecommendations = async (username) => {
    try {
        const mutualFriends = await recommendFriends(username);
        const commonInterests = await recommendFriendsByInterests(username);

        // Combine both results (ensure uniqueness)
        const allRecommendations = [...mutualFriends, ...commonInterests];
        const uniqueRecommendations = Array.from(
            new Set(allRecommendations.map((a) => a.username))
        ).map((username) => {
            return allRecommendations.find((a) => a.username === username);
        });

        return uniqueRecommendations;
    } catch (error) {
        console.error("Error fetching friend recommendations:", error);
        throw new Error("Error fetching friend recommendations");
    }
};

const getFriendRecommendationsController = async (req, res) => {
    const { username } = req.query; // Get the username from the query params

    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }

    try {
        const recommendations = await getFriendRecommendations(username);
        res.status(200).json(recommendations);
    } catch (error) {
        console.error("Error in recommendation system:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = getFriendRecommendationsController;
