const { expect } = require('chai');
const { 
    ServiceError, 
    UploadError, 
    ForbiddenError, 
    ValidationError, 
    NotFoundError, 
    UnknownError 
} = require('../utils/ServiceError');

describe('ServiceError', () => {
    it('should create an instance of ServiceError', () => {
        const error = new ServiceError('Test Error', 100);
        expect(error).to.be.instanceOf(ServiceError);
        expect(error.message).to.equal('Test Error');
        expect(error.code).to.equal(100);
    });

    it('should return a response object', () => {
        const error = new ServiceError('Test Error', 100);
        const response = error.toResponse();
        expect(response).to.deep.equal({
            error: {
                message: 'Test Error',
                code: 100
            }
        });
    });
});

describe('Custom Errors', () => {
    it('should create an instance of UploadError', () => {
        const error = new UploadError();
        expect(error).to.be.instanceOf(UploadError);
        expect(error.message).to.equal('Upload Error');
        expect(error.code).to.equal(400);
    });

    it('should create an instance of ForbiddenError', () => {
        const error = new ForbiddenError();
        expect(error).to.be.instanceOf(ForbiddenError);
        expect(error.message).to.equal('Forbidden');
        expect(error.code).to.equal(403);
    });

    it('should create an instance of ValidationError', () => {
        const error = new ValidationError();
        expect(error).to.be.instanceOf(ValidationError);
        expect(error.message).to.equal('Validation Error');
        expect(error.code).to.equal(422);
    });

    it('should create an instance of NotFoundError', () => {
        const error = new NotFoundError();
        expect(error).to.be.instanceOf(NotFoundError);
        expect(error.message).to.equal('Not Found');
        expect(error.code).to.equal(404);
    });

    it('should create an instance of UnknownError', () => {
        const error = new UnknownError();
        expect(error).to.be.instanceOf(UnknownError);
        expect(error.message).to.equal('Unknown Error');
        expect(error.code).to.equal(500);
    });
});
