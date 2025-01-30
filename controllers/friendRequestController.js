const FriendRequest = require("../models/FriendRequest");
const User = require("../models/User");

// Retrieve all friend requests (optional filters for status, sender, receiver)
const getFriendRequests = async (req, res) => {
    const { status, sender, receiver, limit = 5, offset = 0 } = req.query;

    try {
        const query = {};

        // Add optional filters
        if (status) query.status = status;
        if (sender) query.sender = sender;
        if (receiver) query.receiver = receiver;

        const friendRequests = await FriendRequest.find(query)
            .limit(parseInt(limit))
            .skip(parseInt(offset))
            .populate('sender receiver'); // Populate sender and receiver details

        return res.status(200).json({ success: true, data: friendRequests });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: "Bad Request" });
    }
};

// Retrieve a single friend request by ID
const getFriendRequestById = async (req, res) => {
    try {
        const friendRequest = await FriendRequest.findById(req.params.id).populate('sender receiver');
        if (!friendRequest) return res.status(404).json({ success: false, message: "Friend request not found" });
        return res.status(200).json({ success: true, data: friendRequest });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: "Bad Request" });
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
    getFriendRequests,
    getFriendRequestById,
    sendFriendRequest,
    updateFriendRequestStatus,
    deleteFriendRequest,
};
