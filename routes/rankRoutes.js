const router = require('express').Router();

const { getAllBlogsAccToThereRank, updateRankingOfBlog, setRankOfABlog } = require('../controllers/rankControllers');
const { validateId } = require('../middlewares/validateId');


router.post('/calculate-rank-of-a-blog/:id', validateId, setRankOfABlog);

router.get('/get-all-blog-acc-to-ranking', getAllBlogsAccToThereRank);

router.post('/update-ranking-of-blog/:id', validateId, updateRankingOfBlog);


module.exports = router;