const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET || '';

const createToken = (userId, exp) => {
    const token = jwt.sign({ sub: userId, exp: exp }, jwtSecret);
    return token;
};
const decodeToken = (token) => {
    try {
        const decoded = jwt.verify(token, jwtSecret);
        return decoded;
    } catch (error) {
        return null;
    }
}

module.exports = { createToken, decodeToken};
