const { ValidationError } = require('../utils/ServiceError');

const validateCaptcha = (inputCaptcha, sessionCaptcha) => {
    if (inputCaptcha !== sessionCaptcha) {
        throw new ValidationError('Invalid captcha');
    }
};

module.exports = {
    validateCaptcha
};
