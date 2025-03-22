const adminModel = require('./models/adminModel');

const loginDao = async (loginInfo) => {
    return await adminModel.findOne({
        where : {
            loginId : loginInfo.loginId,
            loginPwd : loginInfo.loginPwd
        }
    })
};

module.exports = {
    loginDao
};
