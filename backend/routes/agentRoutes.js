const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { createAgent, getAgents } = require('../controllers/agentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post(
  '/',
  [
    authMiddleware, 
    [
      body('name', 'Name is required').not().isEmpty(),
      body('email', 'Please include a valid email').isEmail(),
      body('mobile', 'Mobile number is required').not().isEmpty(),
      body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    ],
  ],
  createAgent
);

router.get('/', authMiddleware, getAgents);

module.exports = router;