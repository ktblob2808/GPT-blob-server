const Setting = require('./models/settingModel');

const getSetting = async () => {
  return await Setting.findOne();
};

const updateSetting = async (data) => {
  const setting = await Setting.findOne();
  if (setting) {
    await setting.update(data);
    return setting;
  }
  throw new Error('Setting not found');
};

module.exports = {
  getSetting,
  updateSetting
};
