const Blog = require('./models/blogModel');
const BlogType = require('./models/blogTypeModel');

const addBlog = async (blogData) => {
  const blog = await Blog.create(blogData);
  await BlogType.increment('articleCount', { where: { id: blog.categoryId } });
  return blog;
};

const getAllBlogs = async (page, limit, categoryId) => {
  const offset = (page - 1) * limit;
  const where = categoryId && categoryId !== -1 ? { categoryId } : {};
  const { rows, count } = await Blog.findAndCountAll({
    where,
    include: [{ model: BlogType, as: 'category', attributes: ['name'] }],
    limit,
    offset,
    order: [['createDate', 'DESC']]
  });
  return { rows, count };
};

module.exports = {
  addBlog,
  getAllBlogs
};
