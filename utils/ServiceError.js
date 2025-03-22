const { formatResponse } = require("./tool")

class ServiceError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }

    toResponse() {
        return formatResponse(this.code, this.message, null);
    }
}

class UploadError extends ServiceError {
    constructor(message = 'Upload Error', code = 400) {
        super(message, code);
    }
}

class ForbiddenError extends ServiceError {
    constructor(message = 'Forbidden', code = 403) {
        super(message, code);
    }
}

class ValidationError extends ServiceError {
    constructor(message = 'Validation Error', code = 422) {
        super(message, code);
    }
}

class NotFoundError extends ServiceError {
    constructor(message = 'Not Found', code = 404) {
        super(message, code);
    }
}

class UnknownError extends ServiceError {
    constructor(message = 'Unknown Error', code = 500) {
        super(message, code);
    }
}

module.exports = {
    ServiceError,
    UploadError,
    ForbiddenError,
    ValidationError,
    NotFoundError,
    UnknownError
};
