const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
    nameOfTheBlog: {
        type: String,
        required: [true, 'blog name is required']
    },
    contentOfTheBlog: {
        type: String,
        required: [true, 'blog content is required']
    },
    authorOfTheBlog: {
        type: String,
        required: [true, 'blog author is required']
    },
    totalViewsOnBlog: {
        type: Number,
        default: 0
    },
    totalLikesOnBlog: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Blog', blogSchema);