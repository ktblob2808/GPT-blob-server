const Admin = require('../models/adminModel');

const findAdminByLoginId = async (loginId) => {
    return await Admin.findOne({ where: { loginId } });
};

module.exports = {
    findAdminByLoginId
};
