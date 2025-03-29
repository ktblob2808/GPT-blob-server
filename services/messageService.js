const messageDao = require('../dao/messageDao');
const blogDao = require('../dao/blogDao');
const fs= require("fs");
const dir = './public/static/avatar';
/**
 * Reads the number of files in a directory
 * @param {*} dir Directory path
 */
async function readDirLength(dir){
  return new Promise((resolve)=>{
      fs.readdir(dir, (err, files)=>{
          if(err) throw new UnknownError();
          resolve(files);
      });
  })
}

const getMessages = async (blogId, offset = 0, limit = 10) => {
  return await messageDao.getMessages(blogId, offset, limit);
};

const addMessage = async (data) => {
  if (!data.nickname || !data.content) {
    throw new Error('Nickname and content are required');
  }
  data.blogId = data.blogId || null;


  const avatarPaths = await readDirLength(dir);
  data.avatar = '/static/avatar/' + avatarPaths[Math.floor(Math.random() * avatarPaths.length)];
  const result = await messageDao.addMessage(data);

  if (data.blogId) {
    const blogData = await blogDao.findById(data.blogId);
    blogData.commentNumber++;
    await blogData.save();

  }
  return result;
};

const deleteMessage = async (id) => {
  return await messageDao.deleteMessage(id);
};

module.exports = {
  getMessages,
  addMessage,
  deleteMessage
};
