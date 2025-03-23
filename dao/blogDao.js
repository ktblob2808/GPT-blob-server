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
    include: [{ model: BlogType, as: 'category', attributes: ['id', 'name'] }],
    limit,
    offset,
    order: [['createDate', 'DESC']]
  });
  return { rows, count };
};

// Find blog by ID
async function findById(id) {
  return await Blog.findByPk(id, {
    include : [
        {
            model : BlogType,
            as : "category"
        }
    ]
})
}

// Update blog by ID
async function updateById(id, blogData) {
  await Blog.update(blogData, {
      where : {
          id
      }
  });
  return await Blog.findByPk(id);
  
}

// Delete blog by ID
async function deleteById(id) {
  return await Blog.destroy({
    where : {
        id
    }
})
}


module.exports = {
  addBlog,
  getAllBlogs,
  findById,
  updateById,
  deleteById
};
