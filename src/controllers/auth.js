const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET
})

exports.generateToken = (payload) => {
    const token = jwt.sign(payload,
        process.env.JWT_SECRET,
        {expiresIn: '1d'});

    return token;
}