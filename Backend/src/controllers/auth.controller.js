const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ firstName, lastName, email, password: hashed });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'User already exists or error occurred', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Wrong password' });

    res.status(200).json({ message: 'Login success', user: { id: user.id, name: user.firstName } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
