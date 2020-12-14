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

const findAllFilesByClassId = async ({classId}) => {
  console.log("service get file");
  let file = await File.find({class:classId});
  console.log(file);
  // const sortedByCreationDate = files.sort(
  //   (a, b) => b.createdAt - a.createdAt
  // );
  // console.log(sortedByCreationDate);
//   if (!classroom) throw new CustomError(errorCodes.TEMPLATE_NOT_EXISTS);
//   classroom = await classroom
//   .populate({ path: 'member', select: 'name avatar email' })
//   .execPopulate();


  return file;
};

const findFileById = async ({fileId})=>{
    //console.log(fileId);
    let file= await File.findById(fileId);
    //console.log(file)
    //if (!file) throw new CustomError(errorCodes.TEMPLATE_NOT_EXISTS);
    // file = await file
    // .populate({ path: 'member', select: 'name avatar email' })
    // .execPopulate();
  
  
    return file;
}

module.exports = {
    createFile,
    findAllFilesByClassId,
    findFileById,
};