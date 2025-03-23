const { DataTypes } = require('sequelize');
const sequelize = require('../../dao/dbConnect');

const Banner = sequelize.define('banner', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  midImg: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  bigImg: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'banner',
  freezeTableName : true,
  timestamps: false
});

module.exports = Banner;
