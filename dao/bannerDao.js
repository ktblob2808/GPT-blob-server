const Banner = require('./models/bannerModel');

const getAllBanners = async () => {
  return await Banner.findAll();
};

const updateBanners = async (banners) => {
  await Banner.destroy({ where: {} });
  await Banner.bulkCreate(banners);
  return await Banner.findAll();
};

module.exports = {
  getAllBanners,
  updateBanners
};
