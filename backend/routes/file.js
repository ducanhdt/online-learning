// const path = require('path');
// const express = require('express');
const multer = require('multer');
// const File = require('../model/file');
const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const auth = require('../middlewares/auth');
const {
    apiTypes,
    validate,
    getValidateResult,
  } = require('../middlewares/validate');

  const fileController = require('../controllers/file');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 1000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

router.post(
    '/upload',
    upload.single('file'),
    // auth,
    asyncMiddleware(fileController.uploadFile),
);

router.get(
    '/getAllFiles', 
    auth,
    asyncMiddleware(fileController.getAllFiles),
);

router.get(
    '/download/:id',  
    auth,
    asyncMiddleware(fileController.downloadFile),
);

module.exports = router;
