const express = require('express');
const router = express.Router();
const { loginService } = require('../services/adminService');
const { formatResponse } = require('../utils/tool');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res, next) => {
    try {
        const { loginId, loginPwd, remember } = req.body;
        const { token, data } = await loginService({ loginId, loginPwd, remember });
        res.setHeader('Authorization', `Bearer ${token}`);
        res.json(formatResponse(0, 'Login successful', data));
    } catch (error) {
        res.json(formatResponse(1, error.message));
    }
});

router.get('/whoami', async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json(formatResponse(0, 'Token valid', decoded));
    } catch (error) {
        res.json(formatResponse(1, 'Invalid token'));
    }
});

module.exports = router;
