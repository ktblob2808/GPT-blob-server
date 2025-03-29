const messageDao = require('../dao/messageDao');
const blogDao = require('../dao/blogDao');

const getMessages = async (blogId, offset = 0, limit = 10) => {
  return await messageDao.getMessages(blogId, offset, limit);
};

const addMessage = async (data) => {
  if (!data.nickname || !data.content) {
    throw new Error('Nickname and content are required');
  }
  data.blogId = data.blogId || null;
  const avatarPaths = [
    '/static/avatar/avatar1.jpg',
    '/static/avatar/avatar2.jpg',
    '/static/avatar/avatar3.jpg'
  ];
  data.avatar = avatarPaths[Math.floor(Math.random() * avatarPaths.length)];
  const result = await messageDao.addMessage(data);

  if (data.blogId) {
    await blogDao.incrementCommentCount(data.blogId);
  }
  return result;
};

const deleteMessage = async (id) => {
  const message = await messageDao.getMessageById(id);
  if (message.blogId) {
    await blogDao.decrementCommentCount(message.blogId);
  }
  return await messageDao.deleteMessage(id);
};

module.exports = {
  getMessages,
  addMessage,
  deleteMessage
};
