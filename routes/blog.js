const express = require('express');
const router = express.Router();
const blogService = require('../services/blogService');
const { formatResponse } = require("../utils/tool");

// Add blog
router.post('/blog', async (req, res) => {
  try {
    const blog = await blogService.addBlog(req.body);
    res.json(formatResponse(0, '', blog));
  } catch (error) {
    res.status(500).json(formatResponse(1, '', error.message));
  }
});

// Get all blogs
router.get('/blog', async (req, res) => {
  try {
    const { page = 1, limit = 10, categoryId = -1 } = req.query;
    const blogs = await blogService.getAllBlogs(parseInt(page), parseInt(limit), parseInt(categoryId));
    res.json(formatResponse(0, '', blogs));
  } catch (error) {
    res.status(500).json(formatResponse(1,'', error.message));
  }
});

module.exports = router;
