const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/users', UserController.createUser);

router.post('/authentication', UserController.authenticationUser);

router.get('/users', UserController.authMiddleware, UserController.profileUser);

router.get('/getusers', UserController.getUsers);

router.get('/getuser', UserController.getUser);

router.patch('/user', UserController.updateUser);

module.exports = router;
