// Xem luồng từ routes
// sau đó đến các middleware
// xem lần lượt các middleware

const router = require('express').Router();

const asyncMiddleware = require('../middlewares/async');
const auth = require('../middlewares/auth');
const {
  apiTypes,
  validate,
  getValidateResult,
} = require('../middlewares/validate');

const templateController = require('../controllers/template');

/* eslint-disable prettier/prettier */
router.post('/bots/:botId/templates', auth, validate(apiTypes.CREATE_TEMPLATE), getValidateResult, asyncMiddleware(templateController.createTemplate));
router.get('/bots/:botId/templates/:templateId', auth, asyncMiddleware(templateController.getTemplate));
router.get('/bots/:botId/templates', auth, asyncMiddleware(templateController.getTemplates));
router.put('/bots/:botId/templates/:templateId', auth, asyncMiddleware(templateController.updateTemplate));
router.delete('/bots/:botId/templates/:templateId', auth, asyncMiddleware(templateController.deleteTemplate));
/* eslint-enable prettier/prettier */

module.exports = router;
