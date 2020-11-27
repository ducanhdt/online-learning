const router = require('express').Router();
const auth = require('../middlewares/auth');
const asyncMiddleware = require('../middlewares/async');
const accountController = require('../controllers/account');

/* eslint-disable prettier/prettier */
router.post(
  '/account/change-password',
  auth,
  asyncMiddleware(accountController.changePassword),
);
router.post(
  '/account/change-info',
  auth,
  asyncMiddleware(accountController.changeInfo),
);

router.post(
  '/account/',
  auth,
  asyncMiddleware(accountController.addClassroom),
);

router.delete(
  '/account/',
  auth,
  asyncMiddleware(accountController.removeClassroom),
);

router.get(
  '/account/',
  auth,
  asyncMiddleware(accountController.getClassroom),
);

/* eslint-enable prettier/prettier */

module.exports = router;
