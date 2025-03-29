const express = require('express');
const router = express.Router();
const settingService = require('../services/settingService');
const { formatResponse } = require('../utils/tool');

// Get setting
router.get('/setting', async (req, res) => {
  try {
    const setting = await settingService.getSetting();
    res.json(formatResponse(0, '', setting));
  } catch (error) {
    res.status(500).json(formatResponse(1, '', error.message));
  }
});

// Update setting
router.put('/setting', async (req, res) => {
  try {
    const updatedSetting = await settingService.updateSetting(req.body);
    res.json(formatResponse(0, '', updatedSetting));
  } catch (error) {
    res.status(500).json(formatResponse(1, '', error.message));
  }
});

module.exports = router;
