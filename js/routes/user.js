// In a separate file, e.g., routes/user.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);

module.exports = router;