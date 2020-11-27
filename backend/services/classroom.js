const { ObjectId } = require('mongoose').Types;

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const Classroom = require('../models/classroom');
const Bot = require('../models/bot');

const dbUtil = require('../utils/db');

const createClassroom = async ({accountId,createFields }) => {

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

const findById = async ({classroomId }) => {

  let classroom = await Classroom.findById(classroomId);
  if (!classroom) throw new CustomError(errorCodes.TEMPLATE_NOT_EXISTS);
  classroom = await classroom
  .populate({ path: 'member', select: 'name avatar' })
  .execPopulate();


  return classroom;
};

const findAll = async ({
  search,
  query,
  offset,
  limit,
  fields,
  sort = ['createdAt_asc'],
}) => {
  const { error, documents: classrooms, count } = await dbUtil.findAll(
    Classroom,
    ['name'],
    {
      search,
      query,
      offset,
      limit,
      fields,
      sort,
    },
  );

  if (error) throw error;

  return { classrooms, count };
};

const updateClassroom = async ({ classroomId, updateFields }) => {
 
  let classroom = await Classroom.findByIdAndUpdate(classroomId, updateFields, {
    new: true,
  });
   classroom = await classroom
  .populate({ path: 'member', select: 'name avatar' })
  .execPopulate();

  return classroom;
};

const deleteClassroom = async ({classroomId }) => {

  await Classroom.findByIdAndDelete(classroomId);
};

const addMember = async ({classroomId,accountId }) => {

  let classroom = await Classroom.findById(classroomId);
  if (!classroom) throw new CustomError(errorCodes.TEMPLATE_NOT_EXISTS);
  
  const member = [...classroom.member,accountId];
  console.log({classroom,member});
  await updateClassroom({classroomId, updateFields:{ member}})

  return classroom;
};
const deleteMember = async ({classroomId,accountId }) => {

  let classroom = await Classroom.findById(classroomId);
  if (!classroom) throw new CustomError(errorCodes.TEMPLATE_NOT_EXISTS);
  console.log({classroom});
  const member = classroom.member.filter(item => String(item) != String(accountId) );
  await updateClassroom({classroomId, updateFields:{ member}})

  return classroom;
};

module.exports = {
  addMember,
  deleteMember,
  createClassroom,
  findById,
  findAll,
  updateClassroom,
  deleteClassroom,
};
