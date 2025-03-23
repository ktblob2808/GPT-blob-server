const BlogType = require('./models/blogTypeModel');

const addBlogType = async (name, order) => {
  return await BlogType.create({ name, order });
};

const getBlogTypeById = async (id) => {
  return await BlogType.findByPk(id);
};

const getAllBlogTypes = async () => {
  return await BlogType.findAll({ order: [['order', 'ASC']] });
};

const updateBlogTypeById = async (id, data) => {
  await BlogType.update(data, { where: { id } });
  return await BlogType.findByPk(id);
};

const deleteBlogTypeById = async (id) => {
  const blogType = await BlogType.findByPk(id);
  await BlogType.destroy({ where: { id } });
  return blogType.articleCount;
};

module.exports = {
  addBlogType,
  getBlogTypeById,
  getAllBlogTypes,
  updateBlogTypeById,
  deleteBlogTypeById
};
