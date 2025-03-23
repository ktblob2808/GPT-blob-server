const { DataTypes } = require('sequelize');
const sequelize = require('../../dao/dbConnect');

const BlogType = sequelize.define('BlogType', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  articleCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'blogtype',
  timestamps: false
});

module.exports = BlogType;
