const sequelize = require('./dbConnect');
const adminModel = require('./models/adminModel');
const md5 = require('md5');

sequelize.sync({ alter: true }).then(async () => {
    console.log('Database & tables created!');




    const adminCount = await adminModel.count();
    if (!adminCount) {

        await adminModel.create({
            loginId: 'admin',
            name: 'Administrator',
            loginPwd: md5('admin123')
        });

        console.log("init admin data finished...");
    }
    // Create initial data for the admin table
});
