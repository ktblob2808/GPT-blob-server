const { validate } = require('validate.js');
const blogDao = require('../dao/blogDao');
const blogTypeDao = require('../dao/blogTypeDao');
const blogTypeModel = require("../dao/models/blogTypeModel");
const { ValidationError } = require("../utils/ServiceError");


validate.validators.categoryIdIsExist = async function(value){
    const blogTypeInfo = blogTypeModel.findByPk(value);
    if(blogTypeInfo){
        return;
    }
    return "CategoryId Is Not Exist";
}


const addBlog = async (blogData) => {
    const { categoryId } = blogData;
    blogData.toc = JSON.stringify('[]');
    const category = await blogTypeDao.getBlogTypeById(categoryId);
    if (!category) {
        throw new ValidationError('Invalid categoryId');
    }

    // validate the blog data
    const blogRule = {
        title: {
            presence: {
                allowEmpty: false
            },
            type: "string"
        },
        description: {
            presence: {
                allowEmpty: true
            },
            type: "string"
        },
        htmlContent: {
            presence: {
                allowEmpty: false
            },
            type: "string"
        },
        thumb: {
            presence: {
                allowEmpty: true
            },
            type: "string"
        },
        createDate: {
            presence: {
                allowEmpty: false
            },
            type: "integer"
        },
        categoryId: {
            presence: true,
            type: "integer",
            categoryIdIsExist: true
        }
    }

    try{
        // Since the extended validation rule involves asynchronous operations, we need to use asynchronous validation here
        await validate.async(blogData, blogRule);
        // Add a new blog
        return await blogDao.addBlog(blogData);
        } catch(e){
        // Validation failed
        throw new ValidationError("Data validation failed");
    }

};

const getAllBlogs = async (page, limit, categoryId) => {
  return await blogDao.getAllBlogs(page, limit, categoryId);
};

module.exports = {
  addBlog,
  getAllBlogs
};
