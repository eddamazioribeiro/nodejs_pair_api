const express = require('express');
const router = express.Router();
const {signUp, signIn} = require('../controllers/user');
const {requireSignIn} = require('../controllers/auth');

router.post('/user/signup', signUp);
router.post('/user/signin', signIn);
// test
router.get('/auth/test', requireSignIn, (req, res) => {
    res.json({
        message: 'Authentication token OK!'
    });
});

module.exports = router;