const router = require('express').Router();
const auth = require('../middlewares/auth');
const asyncMiddleware = require('../middlewares/async');
const {
  apiTypes,
  validate,
  getValidateResult,
} = require('../middlewares/validate');
const adminController = require('../controllers/admin');

/* eslint-disable prettier/prettier */
router.post('/admins/accounts', auth, validate(apiTypes.ADMIN_ADD_ACCOUNT), getValidateResult, asyncMiddleware(adminController.addAccount));
router.delete('/admins/accounts', auth, asyncMiddleware(adminController.deleteAccount));
router.get('/admins/accounts', auth, asyncMiddleware(adminController.getAllAccount));
/* eslint-enable prettier/prettier */

module.exports = router;
