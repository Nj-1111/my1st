const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';
const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY || '1h';

// register (simple)
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = new User({ name, email, role });
    if (password) await user.setPassword(password);
    await user.save();
    res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await user.validatePassword(password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ sub: user._id, role: user.role }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

module.exports = router;
