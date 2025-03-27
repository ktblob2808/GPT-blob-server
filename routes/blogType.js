const express = require('express');
const router = express.Router();
const blogTypeService = require('../services/blogTypeService');
const {formatResponse} = require('../utils/tool')

// Add blogType
router.post('/blogtype', async (req, res) => {
  try {
    const { name, order } = req.body;
    const blogType = await blogTypeService.addBlogType(name, order);
    res.json(formatResponse(0, '', blogType));
  } catch (error) {
    res.status(500).json(formatResponse(1, '', error.message));
  }
});

// Get blogType by id
router.get('/blogtype/:id', async (req, res) => {
  try {
    const blogType = await blogTypeService.getBlogTypeById(req.params.id);
    res.json(formatResponse(0, '' , blogType));
  } catch (error) {
    res.status(500).json(formatResponse(1, '', error.message));
  }
});

// Get all blogTypes
router.get('/blogtype', async (req, res) => {
  try {
    const blogTypes = await blogTypeService.getAllBlogTypes();
    res.json(formatResponse(0,"", blogTypes));
  } catch (error) {
    res.status(500).json(formatResponse(1, '', error.message));
  }
});

// Update blogType by id
router.put('/blogtype/:id', async (req, res) => {
  try {
    const blogType = await blogTypeService.updateBlogTypeById(req.params.id, req.body);
    res.json(formatResponse(0, '', blogType));
  } catch (error) {
    res.status(500).json(formatResponse(1, '', error.message));
  }
});

// Delete blogType by id
router.delete('/blogtype/:id', async (req, res) => {
  try {
    const articleCount = await blogTypeService.deleteBlogTypeById(req.params.id);
    res.json(formatResponse(0, '',  articleCount));
  } catch (error) {
    res.status(500).json(formatResponse(1, '', error.message));
  }
});

module.exports = router;
