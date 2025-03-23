const bannerDao = require('../dao/bannerDao');

const getBanners = async () => {
  return await bannerDao.getAllBanners();
};

const updateBanners = async (banners) => {
  return await bannerDao.updateBanners(banners);
};

module.exports = {
  getBanners,
  updateBanners
};
