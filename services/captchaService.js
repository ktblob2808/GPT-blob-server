const validateCaptcha = (inputCaptcha, sessionCaptcha) => {
    if (inputCaptcha !== sessionCaptcha) {
        throw new Error('Invalid captcha');
    }
};

module.exports = {
    validateCaptcha
};
