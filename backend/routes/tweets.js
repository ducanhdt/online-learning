const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const auth = require('../middlewares/auth');
const {
  apiTypes,
  validate,
  getValidateResult,
} = require('../middlewares/validate');

const tweetController = require('../controllers/tweets');


router.post(
  '/tweet',
  asyncMiddleware(tweetController.createTweet),
);

router.get(
  '/tweet/:tweet_id',
  asyncMiddleware(tweetController.getTweet),
  asyncMiddleware(tweetController.deleteTweet),
);

router.get(
    '/getAllTweets/:classid', 
    //auth,
    asyncMiddleware(tweetController.getAllTweets),
);



module.exports = router;
