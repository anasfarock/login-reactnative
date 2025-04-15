const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/auth', authController.login);
router.post('/user', authController.register);

module.exports = router;
