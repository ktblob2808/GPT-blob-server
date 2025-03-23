const express = require('express');
const router = express.Router();
const blogTypeRoute = require('./blogType');

// ...existing code...

router.use('/api', blogTypeRoute);

module.exports = router;