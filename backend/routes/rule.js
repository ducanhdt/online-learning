const router = require('express').Router();

const asyncMiddleware = require('../middlewares/async');
const auth = require('../middlewares/auth');
const {
  apiTypes,
  validate,
  getValidateResult,
} = require('../middlewares/validate');

const ruleController = require('../controllers/rule');

router.post(
  '/bots/:botId/rules',
  auth,
  validate(apiTypes.ADD_NEW_RULE),
  getValidateResult,
  asyncMiddleware(ruleController.createRule),
);
router.get(
  '/bots/:botId/rules/:ruleId',
  auth,
  validate(apiTypes.GET_RULE),
  getValidateResult,
  asyncMiddleware(ruleController.getRule),
);
router.get(
  '/bots/:botId/rules',
  auth,
  validate(apiTypes.GET_RULE),
  getValidateResult,
  asyncMiddleware(ruleController.getRules),
);
router.put(
  '/bots/:botId/rules/:ruleId',
  auth,
  validate(apiTypes.UPDATE_RULE),
  getValidateResult,
  asyncMiddleware(ruleController.updateRule),
);
router.delete(
  '/bots/:botId/rules/:ruleId',
  auth,
  validate(apiTypes.DELETE_RULE),
  getValidateResult,
  asyncMiddleware(ruleController.deleteRule),
);

module.exports = router;
