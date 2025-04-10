const express = require('express');
const router = express.Router();
const CityController = require('../controllers/CityController');

router.post('/city', CityController.createCity);

router.get('/city', CityController.getCity);

module.exports = router;