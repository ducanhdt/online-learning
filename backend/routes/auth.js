const router = require('express').Router();
const auth = require('../middlewares/auth');
const asyncMiddleware = require('../middlewares/async');
const {
  apiTypes,
  validate,
  getValidateResult,
} = require('../middlewares/validate');
const authController = require('../controllers/auth');

/* eslint-disable prettier/prettier */
router.post('/auths/login', validate(apiTypes.LOGIN), getValidateResult, asyncMiddleware(authController.login));
router.post('/auths/register', auth, validate(apiTypes.REGISTER), getValidateResult, asyncMiddleware(authController.register));
router.get('/auths/verify', auth, asyncMiddleware(authController.verifyAccessToken));
/* eslint-enable prettier/prettier */

module.exports = router;
