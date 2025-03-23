const express = require('express');
const router = express.Router();
const upload = require('../tool');
const { formatResponse } = require("../utils/tool");
const multer = require("multer");
const { UploadError } = require("../utils/ServiceError");


router.post('/upload',  async function (req, res, next) {

    upload.single('file')(req, res, err=>{
        if (err instanceof multer.MulterError) {
            next(new UploadError("Failed to upload the file. Please check the file size and make sure it is within 2MB."));
        } else {
            const filePath = `/static/uploads/${req.file.filename}`;
            res.json(formatResponse(0, "", filePath));
        }
    });
});

module.exports = router;

module.exports = router;
