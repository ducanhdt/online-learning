const router = require('express').Router();

const asyncMiddleware = require('../middlewares/async');
const auth = require('../middlewares/auth');
const {
  apiTypes,
  validate,
  getValidateResult,
} = require('../middlewares/validate');

const classroomController = require('../controllers/classroom');

router.post(
  '/classroom',
  auth,
  validate(apiTypes.ADD_NEW_CLASSROOM),
  getValidateResult,
  asyncMiddleware(classroomController.createClassroom),
);
router.get(
  '/classroom/:classroomId',
  auth,
  asyncMiddleware(classroomController.getClassroom),
);
router.get(
  '/classroom',
  auth,
  // validate(apiTypes.GET_CLASSROOM),
  // getValidateResult,
  asyncMiddleware(classroomController.getClassrooms),
);
router.put(
  '/classroom/:classroomId',
  auth,
  validate(apiTypes.UPDATE_CLASSROOM),
  getValidateResult,
  asyncMiddleware(classroomController.updateClassroom),
);
router.delete(
  '/classroom/:classroomId',
  auth,
  validate(apiTypes.DELETE_CLASSROOM),
  getValidateResult,
  asyncMiddleware(classroomController.deleteClassroom),
);

module.exports = router;
