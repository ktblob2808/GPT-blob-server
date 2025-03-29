const settingDao = require('../dao/settingDao');

const getSetting = async () => {
  return await settingDao.getSetting();
};

const updateSetting = async (data) => {
  return await settingDao.updateSetting(data);
};

module.exports = {
  getSetting,
  updateSetting
};
