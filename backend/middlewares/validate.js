// Tại đây sẽ kiểm tra các tham số đầu vào từ body, params, query có thỏa mãn không,
// Đọc thêm về lib này để biết chi tiết cách dùng

const { body, validationResult, param } = require('express-validator');
const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const apiTypes = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  GET_RULE: 'GET_RULE',
  ADD_NEW_RULE: 'ADD_NEW_RULE',
  UPDATE_RULE: 'UPDATE_RULE',
  DELETE_RULE: 'DELETE_RULE',
  GET_CLASSROOM: 'GET_CLASSROOM',
  ADD_NEW_CLASSROOM: 'ADD_NEW_CLASSROOM',
  UPDATE_CLASSROOM: 'UPDATE_CLASSROOM',
  DELETE_CLASSROOM: 'DELETE_CLASSROOM',
  ADMIN_ADD_ACCOUNT: 'ADMIN_ADD_ACCOUNT',
  CREATE_TEMPLATE: 'CREATE_TEMPLATE',
};

function validate(api) {
  switch (api) {
    case apiTypes.LOGIN:
      return [
        body('email')
          .exists()
          .withMessage('"email" is required')
          .isEmail()
          .withMessage('"email" is invalid'),
        body('password')
          .exists()
          .withMessage('"password" is required')
          .isString()
          .trim(),
      ];
    case apiTypes.REGISTER:
      return [
        body('name')
          .exists()
          .withMessage('"name" is required')
          .isString()
          .trim(),
        body('email')
          .exists()
          .withMessage('"email" is required')
          .isEmail()
          .withMessage('"email" is invalid'),
      ];
    case apiTypes.GET_RULE: {
      return param('botId')
        .exists()
        .withMessage(`Bot info is wrong`);
    }
    case apiTypes.ADD_NEW_RULE: {
      return [
        param('botId')
          .exists()
          .withMessage(`Bot info is wrong`),
        body('keyword')
          .exists()
          .withMessage('Keyword is required'),
      ];
    }
    case apiTypes.UPDATE_RULE: {
      return [
        param('botId')
          .exists()
          .withMessage(`Bot info is wrong`),
        param('ruleId')
          .exists()
          .withMessage(`Rule info is wrong`),
        body('keyword')
          .exists()
          .withMessage('Keyword is required'),
        body('actions')
          .exists()
          .withMessage('Actions is required'),
      ];
    }
    case apiTypes.DELETE_RULE: {
      return [
        param('botId')
          .exists()
          .withMessage(`Bot info is wrong`),
        param('ruleId')
          .exists()
          .withMessage(`Rule info is wrong`),
      ];
    }
    case apiTypes.GET_CLASSROOM: {
      return [
        body('name')
          .exists()
          .withMessage('name is required'),
      ];
    }
    case apiTypes.ADD_NEW_CLASSROOM: {
      return [
        body('name')
          .exists()
          .withMessage('name is required'),
      ];
    }
    case apiTypes.UPDATE_CLASSROOM: {
      return [
        param('classroomId')
          .exists()
          .withMessage(`Rule info is wrong`),
        body('name')
          .exists()
          .withMessage('name is required'),
      ];
    }
    case apiTypes.DELETE_CLASSROOM: {
      return [
        param('classroomId')
          .exists()
          .withMessage(`classroomid is required`),
      ];
    }

    case apiTypes.ADMIN_ADD_ACCOUNT:
      return [
        body('name')
          .exists()
          .withMessage('"name" is required')
          .isString()
          .trim(),
        body('email')
          .exists()
          .withMessage('"email" is required')
          .isEmail()
          .withMessage('"email" is invalid'),
      ];
    case apiTypes.CREATE_TEMPLATE:
      return [
        body('name')
          .exists()
          .withMessage('"name" is required'),
      ];
    default:
      return [];
  }
}

function getValidateResult(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new CustomError(errorCodes.BAD_REQUEST, errors.array().shift().msg);
  }
  next();
}

module.exports = {
  apiTypes,
  validate,
  getValidateResult,
};
