const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: 'User already exists' });

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.status(201).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) { next(err); }
};

exports.login = async (req, res) => {
  try {
    // 1. Strict destructuring: This guarantees we only grab the strings!
    const { email, password } = req.body;

    // Safety check: If email is somehow still an object, this will catch it
    if (typeof email !== 'string') {
      return res.status(400).json({ success: false, error: 'Email must be a string' });
    }

    // 2. The exact search query asking for the string AND the hidden password
    const user = await User.findOne({ email: email }).select('+password');
    
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // 3. Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // 4. Success! Generate Token and return user data
    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email, level: user.level, xp: user.xp }
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ success: false, error: 'Server error during login' });
  }
};

exports.getMe = async (req, res, next) => {
  res.json({ success: true, data: req.user });
};