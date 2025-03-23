const sequelize = require('./database');
const Banner = require('../model/bannerModel');

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mysite',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
};

const initialData = async () => {
  await Banner.sync({ force: true });
  await Banner.bulkCreate([
    {
      midImg: 'midImg1.jpg',
      bigImg: 'bigImg1.jpg',
      title: 'Banner 1',
      description: 'Description 1'
    },
    {
      midImg: 'midImg2.jpg',
      bigImg: 'bigImg2.jpg',
      title: 'Banner 2',
      description: 'Description 2'
    }
  ]);
};

initialData();
