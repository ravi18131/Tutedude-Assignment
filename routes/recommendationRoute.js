const express = require('express');
const router = express.Router();
const getFriendRecommendationsController = require('../controllers/recommendationsController')

// User Sign-Up
router.get('/', getFriendRecommendationsController);

module.exports = router;