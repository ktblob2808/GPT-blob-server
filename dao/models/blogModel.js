const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const BlogType = require('./blogTypeModel');

const Blog = sequelize.define('Blog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  toc: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  htmlContent: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  thumb: {
    type: DataTypes.STRING,
    allowNull: false
  },
  scanNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  commentNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  createDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: BlogType,
      key: 'id'
    }
  }
}, {
  tableName: 'blog',
  timestamps: false
});

Blog.belongsTo(BlogType, { foreignKey: 'categoryId', as: 'category' });
BlogType.hasMany(Blog, { foreignKey: 'categoryId', as: 'articles' });

module.exports = Blog;
