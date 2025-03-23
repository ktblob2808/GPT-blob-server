const express = require('express');
const router = express.Router();
const bannerService = require('../service/bannerService');

// GET /api/banner
router.get('/banner', async (req, res) => {
  try {
    const banners = await bannerService.getBanners();
    res.json({ success: true, data: banners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/banner
router.post('/banner', async (req, res) => {
  try {
    const banners = req.body;
    await bannerService.updateBanners(banners);
    res.json({ success: true, message: 'Banners updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
