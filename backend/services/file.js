const { ObjectId } = require('mongoose').Types;

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const File = require('../models/file');

const dbUtil = require('../utils/db');

const createFile = async ({file}) => {

  const existClassroom = await Classroom.findOne({ name: createFields.name });
  if (existClassroom) throw new CustomError(errorCodes.TEMPLATE_EXISTS);

  let classroom = await Classroom.create({
    member : [accountId],
    createdBy: {accountId},
    ...createFields,
  });
  classroom = await classroom
  .populate({ path: 'member', select: 'name avatar' })
  .execPopulate();

  return classroom;
};

const findAllFilesByClassId = async ({}) => {

  let file = await File.find({});
  const sortedByCreationDate = files.sort(
    (a, b) => b.createdAt - a.createdAt
  );
//   if (!classroom) throw new CustomError(errorCodes.TEMPLATE_NOT_EXISTS);
//   classroom = await classroom
//   .populate({ path: 'member', select: 'name avatar email' })
//   .execPopulate();


  return sortedByCreationDate;
};

const finfFileById = async ({fileId})=>{

    let file= await File.findById(fileId);
    if (!file) throw new CustomError(errorCodes.TEMPLATE_NOT_EXISTS);
    // file = await file
    // .populate({ path: 'member', select: 'name avatar email' })
    // .execPopulate();
  
  
    return file;
}

module.exports = {
    createFile,
    findAllFilesByClassId,
    finfFileById,
};