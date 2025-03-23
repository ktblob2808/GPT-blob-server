const blogTypeDao = require('../dao/blogTypeDao');

const addBlogType = async (name, order) => {
  if (!name || !order) {
    throw new Error('Name and order are required');
  }
  return await blogTypeDao.addBlogType(name, order);
};

const getBlogTypeById = async (id) => {
  return await blogTypeDao.getBlogTypeById(id);
};

const getAllBlogTypes = async () => {
  return await blogTypeDao.getAllBlogTypes();
};

const updateBlogTypeById = async (id, data) => {
  return await blogTypeDao.updateBlogTypeById(id, data);
};

const deleteBlogTypeById = async (id) => {
  return await blogTypeDao.deleteBlogTypeById(id);
};

module.exports = {
  addBlogType,
  getBlogTypeById,
  getAllBlogTypes,
  updateBlogTypeById,
  deleteBlogTypeById
};
