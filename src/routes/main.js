const express = require('express');
const router = express.Router();
const {test, post} = require('../controllers/main');

router.get('/test', test);
router.post('/post', post);

module.exports = router;