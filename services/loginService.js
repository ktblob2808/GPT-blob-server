const adminDao = require('../dao/adminDao');
const md5 = require('md5');

const login = async (loginId, loginPwd) => {
    const admin = await adminDao.findAdminByLoginId(loginId);
    if (!admin) {
        throw new Error('Admin not found');
    }

    if (admin.loginPwd !== md5(loginPwd)) {
        throw new Error('Invalid password');
    }

    return { message: 'Login successful' };
};

module.exports = {
    login
};
