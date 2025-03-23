const bannerDao = require('../dao/bannerDao');
const { handleDataPattern, formatResponse } = require("../utils/tool");

const getBanners = async () => {
  return formatResponse(0, "", handleDataPattern(await bannerDao.getAllBanners()))
};

const updateBanners = async (banners) => {
  return formatResponse(0, "", handleDataPattern(await bannerDao.updateBanners(banners)));
};

module.exports = {
  getBanners,
  updateBanners
};
