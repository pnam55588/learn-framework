const express = require('express');
const router = express.Router();
const fake = require('../../db/fake');
const { createToken, decodeToken } = require('../../helpers/token.helper');
const { TOKEN_EXP_TIME } = require('../../configs/token.config');

router.post('/login', (req, res, next) => {
    try {
        const userReq = {
            email: req.body.email,
            password: req.body.password,
        };
        const user = fake.users.find(
            (user) =>
                user.email === userReq.email &&
                user.password === userReq.password,
        );
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const token = createToken(user.id, Date.now() + TOKEN_EXP_TIME); // 1 hour
        res.success({ token: token });
        return;
    } catch (error) {
        // res.error({ message: error.message });
        throw new Error(error.message);
    }
});

module.exports = router;
