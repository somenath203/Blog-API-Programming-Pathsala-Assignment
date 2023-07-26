const router = require('express').Router();

const { createNewBlog, viewAParticularBlog, likeAParticularBlog } = require('../controllers/blogControllers');
const { validateId } = require('../middlewares/validateId');


router.post('/create-new-blog', createNewBlog);

router.post('/view-a-blog/:id', validateId, viewAParticularBlog);

router.post('/like-a-blog/:id', validateId, likeAParticularBlog);


module.exports = router;