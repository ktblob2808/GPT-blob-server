const sequelize = require('./dbConnect');
const adminModel = require('./models/adminModel');
const bannerModel = require("./models/bannerModel");
const md5 = require('md5');
const BlogType = require('./models/blogTypeModel');

sequelize.sync({ alter: true }).then(async () => {
    console.log('Database & tables created!');

    // Create initial data for the admin table
    const adminCount = await adminModel.count();
    if (!adminCount) {

        await adminModel.create({
            loginId: 'admin',
            name: 'Administrator',
            loginPwd: md5('admin123')
        });

        console.log("init admin data finished...");
    }
    // Create initial data for the banner table
    const bannerCount = await bannerModel.count();
    if (!bannerCount) {

        await bannerModel.bulkCreate([
            {
                midImg: '/static/images/bg1_mid.jpg',
                bigImg: '/static/images/bg1_big.jpg',
                title: 'Banner 1',
                description: 'Description 1'
            },
            {
                midImg: '/static/images/bg2_mid.jpg',
                bigImg: '/static/images/bg2_big.jpg',
                title: 'Banner 2',
                description: 'Description 2'
            },
            {
                midImg: '/static/images/bg3_mid.jpg',
                bigImg: '/static/images/bg3_big.jpg',
                title: 'Banner 3',
                description: 'Description 3'
            }
          ]);

        console.log("init banner data finished...");
    }

    // Create initial data for the blogtype table
    await BlogType.sync({ force: true });
    await BlogType.bulkCreate([
        { name: 'Technology', articleCount: 0, order: 1 },
        { name: 'Lifestyle', articleCount: 0, order: 2 },
        { name: 'Travel', articleCount: 0, order: 3 }
    ]);

    console.log("init blogtype data finished...");
});
