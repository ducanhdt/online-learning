const router = require('express').Router();

const asyncMiddleware = require('../middlewares/async');
const auth = require('../middlewares/auth');
const {
  apiTypes,
  validate,
  getValidateResult,
} = require('../middlewares/validate');

const videoController = require('../controllers/video');

router.post(
  '/video/token',
  asyncMiddleware(videoController.postVideoToken),
);

router.get(
  '/video/token',
  asyncMiddleware(videoController.getVideoToken),
);

module.exports = router;
