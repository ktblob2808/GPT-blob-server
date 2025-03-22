const express = require('express');
const router = express.Router();
const { loginService } = require('../service/adminService');

router.post('/login', async (req, res, next) => {
    try {
    
        const result = await loginService(req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
