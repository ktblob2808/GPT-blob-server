const { DataTypes } = require('sequelize');
const sequelize = require('../../dao/dbConnect');

const Setting = sequelize.define('Setting', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false
  },
  siteTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  github: {
    type: DataTypes.STRING,
    allowNull: false
  },
  qq: {
    type: DataTypes.STRING,
    allowNull: false
  },
  qqQrCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  weixin: {
    type: DataTypes.STRING,
    allowNull: false
  },
  weixinQrCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  icp: {
    type: DataTypes.STRING,
    allowNull: false
  },
  githubName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  favicon: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'setting',
  timestamps: false
});

module.exports = Setting;
