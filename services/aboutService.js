const aboutDao = require('../dao/aboutDao');

const getAbout = async () => {
  return await aboutDao.getAbout();
};

const updateAbout = async (url) => {
  return await aboutDao.updateAbout(url);
};

module.exports = {
  getAbout,
  updateAbout
};
