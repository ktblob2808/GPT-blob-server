const adminModel = require('./models/adminModel');

const loginDao = async (loginInfo) => {
    return await adminModel.findOne({
        where : {
            loginId : loginInfo.loginId,
            loginPwd : loginInfo.loginPwd
        }
    })
};

const updateAdminDao = async function(newAccountInfo){
    return await adminModel.update(newAccountInfo, {
        where : {
            loginId : newAccountInfo.loginId
        }
    })
}
module.exports = {
    loginDao,
    updateAdminDao
};
