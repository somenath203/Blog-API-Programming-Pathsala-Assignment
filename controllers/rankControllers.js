const { StatusCodes } = require('http-status-codes');

const Blog = require('./../models/blogSchema');
const Rank = require('./../models/rankSchema');


const setRankOfABlog = async (req, res) => {

    try {


        const blogOfTheParticularRank = await Rank.findOne({ blog: req.body.idOfTheBlog });

        if(blogOfTheParticularRank) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'The initial rank has already been created for this blog. You can now only update the rank, not create a new one.'
            })
        }

        const getBlogById = await Blog.findById(req.body.idOfTheBlog);

        const totalNumberOfLikes = getBlogById.totalLikesOnBlog;

        const totalNumberOfViews = getBlogById.totalViewsOnBlog;

        const totalScore = totalNumberOfLikes + totalNumberOfViews;


        await Rank.create({
            totalNumberOfLikesAndViewsOnTheBlog: totalScore,
            blog: getBlogById._id
        });

        res.status(201).json({
            success: true,
            message: 'your rank has been calculated successfully',
        });
        
        
    } catch (error) {
        
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
            data: null
        });

    };

};

const getAllBlogsAccToThereRank = async (req, res) => {

    try {

        const getAllBlogsAccToItsRank = await Rank.find({}).sort({ totalNumberOfLikesAndViewsOnTheBlog: -1 }).populate('blog', 'nameOfTheBlog').exec();

        res.status(StatusCodes.OK).json({
            success: true,
            message: 'all blogs are fetched successfully and the blogs has been ranked according to there (total number of views + total number of likes) in descending order',
            totalNumberOfBlogs: getAllBlogsAccToItsRank.length,
            allBlogs: getAllBlogsAccToItsRank
        })
        
    } catch (error) {
        
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
            data: null
        });

    };

};

const updateRankingOfBlog = async (req, res) => {

    try {


        const getBlogById = await Blog.findById(req.body.idOfTheBlog);

        
        const totalNumberOfLikes = getBlogById.totalLikesOnBlog;

        const totalNumberOfViews = getBlogById.totalViewsOnBlog;

        const totalScore = totalNumberOfLikes + totalNumberOfViews;


        await Rank.findOneAndUpdate({ blog: getBlogById.id }, { totalNumberOfLikesAndViewsOnTheBlog: totalScore }, { new: true, runValidators: true });

        
        res.status(StatusCodes.OK).json({
            success: true,
            message: `rank for the blog: '${getBlogById.nameOfTheBlog}' has been updated successfully`
        });
        
    } catch (error) {
        
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
            data: null
        });

    };

};


module.exports = {
    setRankOfABlog,
    getAllBlogsAccToThereRank,
    updateRankingOfBlog
}