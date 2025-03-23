const Banner = require('../model/bannerModel');

const getAllBanners = async () => {
  return await Banner.findAll();
};

const updateBanners = async (banners) => {
  await Banner.destroy({ where: {} });
  return await Banner.bulkCreate(banners);
};

module.exports = {
  getAllBanners,
  updateBanners
};
