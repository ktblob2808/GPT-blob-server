const { DataTypes } = require('sequelize');
const sequelize = require('../../dao/dbConnect');

const About = sequelize.define('About', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'about',
  timestamps: false
});

module.exports = About;
