const express = require('express');
const router = express.Router();
const loginService = require('../services/loginService');

router.post('/login', async (req, res, next) => {
    try {
        const { loginId, loginPwd } = req.body;
        const result = await loginService.login(loginId, loginPwd);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
