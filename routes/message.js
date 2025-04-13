const express = require('express');
const router = express.Router();
const messageService = require('../services/messageService');
const { formatResponse } = require('../utils/tool');

// GET all messages
router.get('/message', async (req, res) => {
  try {
    const { offset, limit } = req.query;
    const result = await messageService.getMessages(null, offset, limit);
    res.json(formatResponse(0, '', result));
  } catch (error) {
    res.status(500).json(formatResponse(1, '', error.message));
  }
});

// GET all comments
router.get('/comment', async (req, res) => {
  try {
    const { blogId, offset, limit } = req.query;
    const result = await messageService.getMessages(blogId, offset, limit);
    res.json(formatResponse(0, '', result));
  } catch (error) {
    res.status(500).json(formatResponse(1, error.message));
  }
});

// POST message
router.post('/message', async (req, res) => {
  try {
    const data = { ...req.body, createDate: Date.now()}; // Add createDate
    const result = await messageService.addMessage(data);
    res.json(formatResponse(0, '', result));
  } catch (error) {
    res.status(500).json(formatResponse(1, error.message));
  }
});

// POST comment
router.post('/comment', async (req, res) => {
  try {
    const data = { ...req.body, createDate: Date.now()}; // Add createDate
    const result = await messageService.addMessage(data);
    res.json(formatResponse(0, '', result));
  } catch (error) {
    res.status(500).json(formatResponse(1, error.message));
  }
});

// DELETE message
router.delete('/message/:id', async (req, res) => {
  try {
    const result = await messageService.deleteMessage(req.params.id);
    res.json(formatResponse(0, '', true));
  } catch (error) {
    res.status(500).json(formatResponse(1, error.message));
  }
});

// DELETE comment
router.delete('/comment/:id', async (req, res) => {
  try {
    const result = await messageService.deleteMessage(req.params.id);
    res.json(formatResponse(0, '', true));
  } catch (error) {
    res.status(500).json(formatResponse(1, error.message));
  }
});

module.exports = router;
