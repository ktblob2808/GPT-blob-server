const { loginDao } = require('../dao/adminDao');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const loginService = async (loginInfo) => {
    loginInfo.loginPwd = md5(loginInfo.loginPwd);
    let data = await loginDao(loginInfo);
    if (data && data.dataValues) {
        // add token
        data = {
            id: data.dataValues.id,
            loginId: data.dataValues.loginId,
            name: data.dataValues.name,
        };
        var loginPeriod = null;
        if (loginInfo.remember) {
            loginPeriod = parseInt(loginInfo.remember);
        } else {
            loginPeriod = 1;
        }

        const token = jwt.sign(
            data,
            md5(process.env.JWT_SECRET),
            { expiresIn: 60 * 60 * 24 * loginPeriod } 
        );

        return { token, data };
    }
    return { data };
};

module.exports = {
    loginService
};
