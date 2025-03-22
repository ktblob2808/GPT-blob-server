const { loginDao } = require('../dao/adminDao');
const md5 = require('md5');

const loginService = async (loginInfo) => {
    loginInfo.loginPwd = md5(loginInfo.loginPwd);
    const data = await loginDao(loginInfo);
    if (data && data.dataValues) {
        // add token
    }
    return { data };
};

module.exports = {
    loginService
};
