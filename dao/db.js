const sequelize = require('./dbConnect');
const adminModel = require('./models/adminModel');
const bannerModel = require("./models/bannerModel");
const md5 = require('md5');
const blogTypeModel = require('./models/blogTypeModel');
const blogModel = require('./models/blogModel');
const Demo = require('./models/demoModel');
const settingModel = require('./models/settingModel');
const aboutModel = require('./models/aboutModel');

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
     // Create initial data for the blogType table
     const blogTypeCount = await blogTypeModel.count();
     if (!blogTypeCount) {
 
         await blogTypeModel.bulkCreate([
            { name: 'Technology', articleCount: 0, order: 1 },
            { name: 'Lifestyle', articleCount: 0, order: 2 },
            { name: 'Travel', articleCount: 0, order: 3 }
           ]);
 
         console.log("init blogtype data finished...");
     }

     // Create initial data for the Demo table
     const demoCount = await Demo.count();
     if (!demoCount) {
         await Demo.bulkCreate([
            {
              name: 'Project A',
              url: 'https://project-a.com',
              github: 'https://github.com/project-a',
              description: JSON.stringify(['vue', 'nodejs', 'html', 'css']),
              thumb: 'https://project-a.com/thumb.jpg',
              order: 1
            },
            {
              name: 'Project B',
              url: 'https://project-b.com',
              github: 'https://github.com/project-b',
              description: JSON.stringify(['react', 'express', 'typescript']),
              thumb: 'https://project-b.com/thumb.jpg',
              order: 2
            }
          ]);
         console.log("init demo data finished...");
     }

     // Create initial data for the Setting table
     const settingCount = await settingModel.count();
     if (!settingCount) {
         await settingModel.create({
             avatar: '/static/images/avatar.jpg',
             siteTitle: 'My Blog',
             github: 'https://github.com/my-profile',
             qq: '12345678',
             qqQrCode: '/static/images/qrcode.jpg',
             weixin: 'my_weixin',
             weixinQrCode: '/static/images/qrcode.jpg',
             mail: 'myemail@example.com',
             icp: 'ICP 12345678',
             githubName: 'my-github',
             favicon: '/static/images/favicon.png'
         });
         console.log("init setting data finished...");
     }

     // Create initial data for the About table
     const aboutCount = await aboutModel.count();
     if (!aboutCount) {
         await aboutModel.create({
             url: 'https://example.com/about'
         });
         console.log("init about data finished...");
     }
});