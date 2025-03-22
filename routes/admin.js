const express = require('express');
const router = express.Router();
const { loginService } = require('../service/adminService');
const { formatResponse } = require('../utils/tool');
const jwt = require('jsonwebtoken');
const md5 = require("md5")

router.post('/login', async (req, res, next) => {
    try {
        const { token, data } = await loginService(req.body);
        res.setHeader('authentication', token);
        res.json(formatResponse(0, 'Login successful', data));
    } catch (error) {
        console.log(error)
        res.json(formatResponse(1, error.message));
    }
});

router.get('/whoami', async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, md5(process.env.JWT_SECRET));
        res.json(formatResponse(0, 'Token valid', {
            "loginId": decoded.loginId,
            "name": decoded.name,
            "id": decoded.id
        }));
    } catch (error) {
        res.json(formatResponse(1, 'Invalid token'));
    }
});

module.exports = router;
