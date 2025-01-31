const FriendRequest = require("../models/FriendRequest");
const User = require("../models/User");

// Retrieve all friend requests (optional filters for status, sender, receiver)
const getFriendRequests = async (req, res) => {
    try {
        // Get the receiver username from params
        const { username } = req.params;

        // Fetch all pending friend requests for the receiver
        const friendRequests = await FriendRequest.find({
            receiver: username,
            status: "Pending",
        });

        // If no friend requests found, return an empty array
        if (!friendRequests || friendRequests.length === 0) {
            return res.status(200).json({ success: true, data: [] });
        }

        // Fetch the sender data for each friend request
        const senderIds = friendRequests.map((request) => request.sender); // Assuming sender is stored as an ID

        // Get user details for the senders
        const senders = await User.find({ username: { $in: senderIds } });

        // Map the friend requests to include sender details
        const response = friendRequests.map((request) => {
            const sender = senders.find((user) => user.username === request.sender);
            return {
                id: request._id, // ID of the friend request
                sender: {
                    username: sender.username,
                    email: sender.email,
                    profileDetails: sender.profileDetails, // Include other user details like avatar, bio, etc.
                },
                status: request.status,
                createdAt: request.createdAt,
            };
        });

        // Return the data
        return res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Error fetching friend requests:", error);
        return res.status(400).json({ success: false, message: "Bad Request" });
    }
};

const getFriendsList = async (req, res) => {
    try {
        // Get the receiver username from params
        const { username } = req.params;

        // Fetch all accepted friend requests for the receiver or as a sender
        const friendRequests = await FriendRequest.find({
            $or: [
                { receiver: username, status: "Accepted" },
                { sender: username, status: "Accepted" }
            ]
        });

        // If no friend requests found, return an empty array
        if (!friendRequests || friendRequests.length === 0) {
            return res.status(200).json({ success: true, data: [] });
        }

        // Extract usernames (both sender and receiver) from the friend requests
        const friendUsernames = friendRequests.flatMap((request) => {
            if (request.sender === username) return request.receiver;
            if (request.receiver === username) return request.sender;
            return null;
        }).filter((friend) => friend !== username); // Exclude the current user

        // Get user details for the friends
        const friends = await User.find({ username: { $in: friendUsernames } });

        // Map the friend data to the response structure
        const response = friends.map((friend) => ({
            username: friend.username,
            email: friend.email,
            profileDetails: friend.profileDetails, // Include other user details like avatar, bio, etc.
        }));

        // Return the data
        return res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Error fetching friends list:", error);
        return res.status(400).json({ success: false, message: "Bad Request" });
    }
};

// Retrieve all 
const getAlredySendFriendRequestData = async (req, res) => {
    const { sender, receiver } = req.query; // Get sender and receiver from the query parameters

    if (!sender || !receiver) {
        return res.status(400).json({ message: 'Sender and receiver are required' });
    }

    try {
        // Fetch the friend request data where sender and receiver match
        const friendRequest = await FriendRequest.findOne({
            $or: [
                { receiver: sender, sender: receiver },
                { receiver: receiver, sender: sender}
            ]
        });

        if (!friendRequest) {
            return res.status(404).json({ message: 'Friend request not found' });
        }

        // If request found, return the data
        return res.status(200).json(friendRequest);
    } catch (error) {
        console.error("Error fetching friend request:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getMutualConnections = async (req, res) => {
    try {
        const { sender, receiver } = req.query; // Get sender and receiver from the query params

        // Check if both sender and receiver are provided
        if (!sender || !receiver) {
            return res.status(400).json({ message: "Both sender and receiver are required" });
        }

        // Aggregate to find mutual connections
        const mutualConnections = await FriendRequest.aggregate([
            {
                $match: {
                    status: "accepted", // Only accepted requests
                    $or: [
                        { sender: sender },
                        { receiver: sender }
                    ],
                },
            },
            {
                $project: {
                    friends: {
                        $cond: [
                            { $eq: ["$sender", sender] },
                            "$receiver", // If sender is the current user, friend is the receiver
                            "$sender" // If receiver is the current user, friend is the sender
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: "$friends", // Group by friend ID
                },
            },
            {
                $lookup: {
                    from: "friendrequests", // Join with friendrequests collection
                    let: { friendId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                status: "accepted", // Only accepted requests
                                $or: [
                                    { sender: receiver }, // Sender matches the receiver
                                    { receiver: receiver }  // Receiver matches the receiver
                                ],
                            },
                        },
                        {
                            $project: {
                                _id: 1, // We don't need the entire document, just the match
                            },
                        },
                    ],
                    as: "mutualFriends", // Add mutual friends array
                },
            },
            {
                $match: {
                    "mutualFriends": { $ne: [] }, // Ensure there are mutual friends
                },
            },
            {
                $count: "mutualConnections", // Count the number of mutual friends
            },
        ]);

        console.log("mutualConnections: ", mutualConnections);
        
        if (mutualConnections.length === 0) {
            return res.status(200).json({ message: "No mutual connections found." });
        }

        // Return the number of mutual connections
        return res.status(200).json({ mutualConnectionsCount: mutualConnections[0].mutualConnections });
    } catch (error) {
        console.error("Error finding mutual connections:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Send a friend request (Create a new friend request)
const sendFriendRequest = async (req, res) => {
    const { sender, receiver } = req.body;

    try {
        // Check if sender and receiver are provided
        if (!sender || !receiver) {
            return res.status(400).json({ success: false, message: "Sender and Receiver are required" });
        }

        // Ensure the sender is not the same as the receiver
        if (sender === receiver) {
            return res.status(400).json({ success: false, message: "You cannot send a friend request to yourself" });
        }

        // Check if the friend request already exists (either Pending or Accepted)
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender }
            ],
            status: { $in: ['Pending', 'Accepted'] }
        });

        if (existingRequest) {
            return res.status(400).json({ success: false, message: "Friend request already exists or is accepted" });
        }

        // Create the friend request
        const newRequest = await FriendRequest.create({ sender, receiver, status: 'Pending' });

        return res.status(201).json({ success: true, data: newRequest });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: "Bad Request" });
    }
};

// Update the status of a friend request (Accept or Reject)
const updateFriendRequestStatus = async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    try {
        if (!['Accepted', 'Rejected'].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status" });
        }

        const friendRequest = await FriendRequest.findById(id);
        if (!friendRequest) return res.status(404).json({ success: false, message: "Friend request not found" });

        // Update the status
        friendRequest.status = status;
        await friendRequest.save();

        return res.status(200).json({ success: true, message: `Friend request ${status}` });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: "Bad Request" });
    }
};

// Delete a friend request (cancel a pending request)
const deleteFriendRequest = async (req, res) => {
    try {
        const friendRequest = await FriendRequest.findByIdAndDelete(req.params.id);
        if (!friendRequest) return res.status(404).json({ success: false, message: "Friend request not found" });

        return res.status(200).json({ success: true, message: "Friend request deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: "Bad Request" });
    }
};

module.exports = {
    getFriendsList,
    getFriendRequests,
    getMutualConnections,
    getAlredySendFriendRequestData,
    sendFriendRequest,
    updateFriendRequestStatus,
    deleteFriendRequest,
};
