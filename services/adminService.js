const adminDao = require('../dao/adminDao');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const loginService = async ({ loginId, loginPwd, remember }) => {
    const admin = await adminDao.findAdminByLoginId(loginId);
    if (!admin) {
        throw new Error('Admin not found');
    }

    if (admin.loginPwd !== md5(loginPwd)) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign(
        { id: admin.id, loginId: admin.loginId, name: admin.name },
        process.env.JWT_SECRET,
        { expiresIn: remember ? `${remember}d` : '1d' }
    );

    return { token, data: { id: admin.id, loginId: admin.loginId, name: admin.name } };
};

module.exports = {
    loginService
};
