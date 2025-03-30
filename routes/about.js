const express = require('express');
const router = express.Router();
const aboutService = require('../services/aboutService');
const { formatResponse } = require('../utils/tool');

// Get about
router.get('/about', async (req, res) => {
  try {
    const about = await aboutService.getAbout();
    res.json(formatResponse(0, '', about));
  } catch (error) {
    res.status(500).json(formatResponse(1, '', error.message));
  }
});

// Update about
router.post('/about', async (req, res) => {
  try {
    const { url } = req.body;
    const updatedAbout = await aboutService.updateAbout(url);
    res.json(formatResponse(0, '', updatedAbout));
  } catch (error) {
    res.status(500).json(formatResponse(1, '', error.message));
  }
});

module.exports = router;
