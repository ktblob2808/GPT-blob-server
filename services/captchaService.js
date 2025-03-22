const { ValidationError } = require('../utils/errors');

const validateCaptcha = (inputCaptcha, sessionCaptcha) => {
    if (inputCaptcha !== sessionCaptcha) {
        throw new ValidationError('Invalid captcha');
    }
};

module.exports = {
    validateCaptcha
};
