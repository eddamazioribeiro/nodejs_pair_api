const express = require('express');
const router = express.Router();
const {signUp, signIn} = require('../controllers/user');

router.post('/user/signup', signUp);
router.post('/user/signin', signIn);

module.exports = router;