const express = require('express');
const router = express.Router();
const bannerService = require('../services/bannerService');

// GET /api/banner
router.get('/banner', async (req, res) => {
  res.send(await bannerService.getBanners());
});

// POST /api/banner
router.post('/banner', async (req, res) => {
  res.send(await bannerService.updateBanners(req.body));
});

module.exports = router;
