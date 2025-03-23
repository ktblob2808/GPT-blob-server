const blogDao = require('../dao/blogDao');
const blogTypeDao = require('../dao/blogTypeDao');

const addBlog = async (blogData) => {
  const { categoryId } = blogData;
  const category = await blogTypeDao.getBlogTypeById(categoryId);
  if (!category) {
    throw new Error('Invalid categoryId');
  }
  return await blogDao.addBlog(blogData);
};

const getAllBlogs = async (page, limit, categoryId) => {
  return await blogDao.getAllBlogs(page, limit, categoryId);
};

module.exports = {
  addBlog,
  getAllBlogs
};
