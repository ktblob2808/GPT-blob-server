const express = require('express');
const router = express.Router();
const demoService = require('../services/demoService');
const { formatResponse } = require('../utils/tool');

// Add demo
router.post('/project', async (req, res) => {
  try {
    const demo = await demoService.addDemo(req.body);
    res.json(formatResponse(0, '', demo));
  } catch (error) {
    res.status(500).json(formatResponse(1, error.message));
  }
});

// Get all demos
router.get('/project', async (req, res) => {
  try {
    const demos = await demoService.getAllDemos();
    res.json(formatResponse(0, '', demos));
  } catch (error) {
    res.status(500).json(formatResponse(1, error.message));
  }
});

// Update demo by id
router.put('/project/:id', async (req, res) => {
  try {
    const demo = await demoService.updateDemoById(req.params.id, req.body);
    res.json(formatResponse(0, '', demo));
  } catch (error) {
    res.status(500).json(formatResponse(1, error.message));
  }
});

// Delete demo by id
router.delete('/project/:id', async (req, res) => {
  try {
    const order = await demoService.deleteDemoById(req.params.id);
    res.json(formatResponse(0, '', true));
  } catch (error) {
    res.status(500).json(formatResponse(1, error.message));
  }
});

module.exports = router;
