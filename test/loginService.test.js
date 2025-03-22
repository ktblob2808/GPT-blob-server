const { expect } = require('chai');
const { loginService } = require('../services/adminService');
const adminDao = require('../dao/adminDao');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

describe('loginService', () => {
    before(async () => {
        await adminDao.createAdmin({
            loginId: 'testadmin',
            name: 'Test Admin',
            loginPwd: md5('testpassword')
        });
    });

    it('should return a token and data for valid login', async () => {
        const { token, data } = await loginService({ loginId: 'testadmin', loginPwd: 'testpassword' });
        expect(token).to.be.a('string');
        expect(data).to.include({ loginId: 'testadmin', name: 'Test Admin' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        expect(decoded).to.include({ loginId: 'testadmin', name: 'Test Admin' });
    });

    it('should throw an error for invalid login', async () => {
        try {
            await loginService({ loginId: 'invalidadmin', loginPwd: 'invalidpassword' });
        } catch (error) {
            expect(error.message).to.equal('Admin not found');
        }
    });

    it('should throw an error for invalid password', async () => {
        try {
            await loginService({ loginId: 'testadmin', loginPwd: 'wrongpassword' });
        } catch (error) {
            expect(error.message).to.equal('Invalid password');
        }
    });
});
