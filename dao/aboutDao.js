const About = require('./models/aboutModel');

const getAbout = async () => {
  return await About.findOne();
};

const updateAbout = async (url) => {
  const about = await About.findOne();
  if (about) {
    about.url = url;
    await about.save();
    return about;
  }
  throw new Error('About record not found');
};

module.exports = {
  getAbout,
  updateAbout
};
