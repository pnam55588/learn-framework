
const express = require('express');
const { createToken, decodeToken } = require('../helpers/token.helper');

module.exports = function (req, res, next){
    const token = req.headers.authorization?.slice(7);
    if (!token) {
        throw new Error('Invalid token');
    }
    const payload = decodeToken(token);
    req.payload = payload;
    next();
};

