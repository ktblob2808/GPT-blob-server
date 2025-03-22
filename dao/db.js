const sequelize = require('./dbConnect');
const Admin = require('../models/adminModel');
const md5 = require('md5');

sequelize.sync({ force: true }).then(async () => {
    console.log('Database & tables created!');

    // Create initial data for the admin table
    await Admin.create({
        loginId: 'admin',
        name: 'Administrator',
        loginPwd: md5('admin123')
    });
});
