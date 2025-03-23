const express = require('express');
const router = express.Router();
const uploadRoute = require('./uploadRoute');

router.use('/api', uploadRoute);

module.exports = router;