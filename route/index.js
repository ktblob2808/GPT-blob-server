const express = require('express');
const router = express.Router();
const bannerRoute = require('./bannerRoute');

// ...existing code...

router.use('/api', bannerRoute);

// Exclude GET /api/banner from token validation
router.get('/api/banner', bannerRoute);

module.exports = router;
