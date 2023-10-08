const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', authController.signUp);
router.post('/login', authController.login);
router.put('/preferences', authController.authMiddleware, userController.updatePreferences);

module.exports = router;