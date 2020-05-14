const User = require('../models/user');

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
            }

            const {_id, name, email} = user;

            res.json({
                user: {
                    _id: _id,
                    name: name,
                    email: email
                }
            });
        }
    });
}