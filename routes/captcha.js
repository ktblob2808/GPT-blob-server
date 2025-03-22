const express = require('express');
const router = express.Router();
const svgCaptcha = require('svg-captcha');

router.get('/captcha', (req, res) => {
    const captcha = svgCaptcha.create({
        size : 4,
        ignoreChars : "iIl10Oo",
        noise : 6,
        color : true
    });
    req.session.captcha = captcha.text;
    res.type('svg');
    res.status(200).send(captcha.data);
});

module.exports = router;
