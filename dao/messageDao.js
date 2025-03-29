const Message = require('./models/messageModel');
const Blog = require("./models/blogModel");
const { Op } = require("sequelize");

const getMessages = async (blogId, offset = 0, limit = 10) => {
  const where = blogId === 'all' ? { blogId: { [Op.ne]: null } } : blogId ? { blogId } : { blogId: null };
  const { count, rows } = await Message.findAndCountAll({
    where,
    include: 
        blogId === 'all' || blogId ? [{ model: Blog, as: 'blog'}] : [],
    offset: parseInt(offset),
    limit: parseInt(limit),
    order: [['createDate', 'DESC']]
  });
  return { total: count, rows };
};

const addMessage = async (data) => {
  return await Message.create(data);
};

const getMessageById = async (id) => {
  return await Message.findByPk(id);
};

const deleteMessage = async (id) => {
  return await Message.destroy({ where: { id } });
};

module.exports = {
  getMessages,
  addMessage,
  getMessageById,
  deleteMessage
};
