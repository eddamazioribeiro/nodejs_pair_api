const expressJwt = require('express-jwt');
require('dotenv').config();

exports.requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET
})