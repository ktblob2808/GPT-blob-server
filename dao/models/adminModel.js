const { DataTypes } = require('sequelize');
const sequelize = require('../../dao/dbConnect');

const Admin = sequelize.define('admin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    loginId: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    loginPwd: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
}, {
    tableName: 'admin',
    freezeTableName : true,
    timestamps: false
});

module.exports = Admin;
