const mongoose = require('mongoose');


const validateId = (req, res, next) => {

    try {

        const { id } = req.params;

        if (!id) {
            return res.status(500).json({
                success: false,
                message: 'please provide the ID of the blog',
                data: null
            })
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(500).json({
                success: false,
                message: 'please provide a valid mongoose ID of the blog',
                data: null
            })
        };

        req.body.idOfTheBlog = id;

        next();
        
    } catch (error) {
        
        console.log(error);

    };

};


module.exports = {
    validateId
};