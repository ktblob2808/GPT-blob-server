const { DataTypes } = require('sequelize');
const sequelize = require('../../dao/dbConnect');
const Blog = require('./blogModel');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Blog,
      key: 'id'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  }
}, {
  tableName: 'message',
  timestamps: false
});

Blog.hasMany(Message, { foreignKey: 'blogId', target: 'id' });
Message.belongsTo(Blog, { foreignKey: 'blogId', target: 'id', as: "blog"  });

module.exports = Message;
