const express = require('express');
const router = express.Router();
const CommunityController = require('../controllers/CommunityController');

router.post('/community', CommunityController.createCommunity);

router.get('/community', CommunityController.getCommunity);

module.exports = router;
