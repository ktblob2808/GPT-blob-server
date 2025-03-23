const express = require('express');
const router = express.Router();
const { loginService } = require('../services/adminService');
const { formatResponse } = require('../utils/tool');
const jwt = require('jsonwebtoken');
const md5 = require("md5");
const { updateAdminDao, loginDao } = require('../dao/adminDao');
const { ValidationError } = require('../utils/ServiceError');
const { validateCaptcha } = require('../services/captchaService');

router.post('/login', async (req, res, next) => {
    try {
        const { captcha } = req.body;
       // validateCaptcha(captcha, req.session.captcha);

        const { token, data } = await loginService(req.body);
        if(token){
            res.setHeader('authentication', token);
        }
        res.json(formatResponse(0, '', data));
    } catch (error) {
        console.log(error);
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

router.put('/', async (req, res, next) => {
    try {
        const admin = await loginDao({
            loginId: req.body.loginId,
            loginPwd: md5(req.body.oldLoginPwd)
        })
        if (admin && admin.dataValues) {
            
            const newPassword = md5(req.body.loginPwd);
            await updateAdminDao({
                name: req.body.name,
                loginId: req.body.loginId,
                loginPwd: newPassword
            })
            


            res.json(formatResponse(0, '', {
                id: admin.id,
                loginId: req.body.loginId,
                name: req.body.name
            }));
        } else {
            throw new ValidationError("Old password is incorrect");
        }

    } catch (error) {
        next(error);
    }
});

module.exports = router;
