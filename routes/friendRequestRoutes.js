const express = require('express');
const router = express.Router();
const friendRequestController = require('../controllers/friendRequestController');

// Get all friend requests
router.get('/', friendRequestController.getFriendRequests);

// Get a single friend request by ID
router.get('/check-connection', friendRequestController.getAlredySendFriendRequestData);

// Get a single friend request by ID
router.get('/mutual-connections', friendRequestController.getMutualConnections);

// Send a friend request
router.post('/', friendRequestController.sendFriendRequest);

// Accept/Reject a friend request
router.put('/:id', friendRequestController.updateFriendRequestStatus);

// Delete a friend request
router.delete('/:id', friendRequestController.deleteFriendRequest);

module.exports = router;
