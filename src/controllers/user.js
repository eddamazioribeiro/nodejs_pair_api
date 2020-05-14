const User = require('../models/user');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signUp = (req, res) => {
    const user = new User(req.body);

    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        } else {
            user.salt = undefined;
            user.hashed_password = undefined;

            res.json({
                user
            });
        }
    });
}

exports.signIn = (req, res) => {
    const {email, password} = req.body;

    User.findOne({email: email}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found. Please, signup.'
            });
        } else {
            if (!user.authenticate(password)) {
                return res.status(401).json({
                    error: 'Email and password does not match.'
                });
            } else {
                const {_id, name, email} = user;
                const token = jwt.sign({email},
                    process.env.JWT_SECRET,
                    {expiresIn: '1d'});

                res.json({
                    user: {
                        _id: _id,
                        name: name,
                        email: email
                    },
                    token
                });
            }
        }
    });
}