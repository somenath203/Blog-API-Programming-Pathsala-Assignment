const { StatusCodes } = require('http-status-codes');

const Blog = require('./../models/blogSchema');


const createNewBlog = async (req, res) => {

    try {

        const { name, content, author } = req.body;

        if(await Blog.findOne({ nameOfTheBlog: name })) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Blog with this name already exists, Please give another name.'
            });
        };

        const createNewBlog = await Blog.create({
            nameOfTheBlog: name,
            contentOfTheBlog: content,
            authorOfTheBlog: author
        });

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: `your blog named: '${createNewBlog.nameOfTheBlog}' has been created successfully`,
            createdBlog: createNewBlog
        });

    } catch (error) {

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
            data: null
        });

    };

};

const viewAParticularBlog = async (req, res) => {

    try {

        const getBlogById = await Blog.findById(req.body.idOfTheBlog);

        getBlogById.totalViewsOnBlog++;

        await getBlogById.save();

        res.status(StatusCodes.OK).json({
            success: true,
            message: 'you have successfully viewed this blog',
        });


    } catch (error) {

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
            data: null
        });

    };

}

const likeAParticularBlog = async (req, res) => {

    try {

        const getBlogById = await Blog.findById(req.body.idOfTheBlog);

        getBlogById.totalLikesOnBlog++;

        await getBlogById.save();

        res.status(StatusCodes.OK).json({
            success: true,
            message: 'you have successfully liked this blog',
        });

    } catch (error) {

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
            data: null
        });

    };

}


module.exports = {
    createNewBlog,
    viewAParticularBlog,
    likeAParticularBlog
};