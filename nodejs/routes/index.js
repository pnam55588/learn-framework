const express = require('express');
const router = express.Router();
const auth = require('./api/auth');
const users = require('./api/users');
const authMiddleware = require('../middlewares/auth.middleware');

// Route chính
router.get('/', (req, res) => {
    res.send('Hello World!');
});
router.use('/api/auth', auth);
router.use('/api/users', authMiddleware, users);

module.exports = router;