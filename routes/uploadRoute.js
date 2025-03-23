const express = require('express');
const router = express.Router();
const upload = require('../tool');

class UploadError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UploadError';
  }
}

router.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      throw new UploadError('No file uploaded');
    }
    const filePath = `/static/uploads/${req.file.filename}`;
    res.json({ success: true, path: filePath });
  } catch (error) {
    if (error instanceof UploadError) {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
});

module.exports = router;
