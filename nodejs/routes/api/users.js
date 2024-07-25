const express = require('express');
const router = express.Router();
const fake = require('../../db/fake');
const { createToken, decodeToken } = require('../../helpers/token.helper');


router.get('/me', (req, res) => {
    const payload = req.payload;

    if (payload.exp < Date.now()) {
        return res.status(401).json({ message: 'Token expired' });
    }

    const user = fake.users.find((user) => user.id === payload.sub);
    if (!user) {
        throw new Error('User not found');
    }
    return res.success(user);
});

module.exports = router;