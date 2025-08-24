const { validationResult } = require('express-validator');
const Agent = require('../models/Agent');

exports.createAgent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, mobile, password } = req.body;

  try {
    let agent = await Agent.findOne({ email });
    if (agent) {
      return res.status(400).json({ msg: 'Agent with this email already exists' });
    }

    agent = new Agent({
      name,
      email,
      mobile,
      password, 
    });

    await agent.save();

    res.status(201).json(agent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAgents = async (req, res) => {
  try {
    const agents = await Agent.find().select('-password'); 
    res.json(agents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};