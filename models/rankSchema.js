const mongoose = require('mongoose');


const rankSchema = new mongoose.Schema({
    'totalNumberOfLikesAndViewsOnTheBlog': {
        type: Number,
        default: 0
    },
    'blog': {
        type: mongoose.Types.ObjectId,
        ref: 'Blog',
        required: [true, 'blogID is required']
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Rank', rankSchema);