const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/AddressController');

router.post('/addresses', AddressController.createAddress);

router.get('/addresses', AddressController.getAddress);

router.get('/address', AddressController.getCurrentAddress);

router.patch('/addresses', AddressController.updateAddress);

module.exports = router;