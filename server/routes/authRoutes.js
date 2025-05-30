// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');

// // Mock user (in real app, use proper user model)
// const mockUser = {
//   id: '1',
//   username: 'admin',
//   password: 'password' // In production, store hashed passwords
// };

// router.post('/login', (req, res) => {
//   const { username, password } = req.body;
  
//   if (username === mockUser.username && password === mockUser.password) {
//     const token = jwt.sign({ id: mockUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     return res.json({ token });
//   }
  
//   res.status(401).json({ error: 'Invalid credentials' });
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
