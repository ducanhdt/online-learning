const classroomService = require('../services/classroom');
const accountService = require('../services/account.js');

const createClassroom = async (req, res) => {
  const createFields = req.body;
  const classroom = await classroomService.createClassroom({
    accountId: req.account._id,
    createFields,
  });
  await accountService.addClassroom({
    id: req.account._id,
    classroomId: classroom.id,
  });
  return res.send({ status: 1, result: classroom });
};

const getClassroom = async (req, res) => {
  const { classroomId } = req.params;

  const classroom = await classroomService.findById({
    classroomId,
  });

  return res.send({ status: 1, result: classroom });
};

const getClassrooms = async (req, res) => {
  const { search, fields, offset, limit, sort } = req.query;
  const query = {};
  // query.query = { accountId: req.account._id };

  if (search) query.search = search;
  if (fields) query.fields = fields.split(',');
  if (offset) query.offset = parseInt(offset, 10);
  if (limit) query.limit = parseInt(limit, 10);
  if (sort) query.sort = sort.split(',');
  Object.keys(req.query)
    .filter(
      q => ['search', 'fields', 'offset', 'limit', 'sort'].indexOf(q) === -1,
    )
    .forEach(q => {
      query.query[q] = JSON.parse(req.query[q]);
    });
  const { classrooms, count } = await classroomService.findAll({
    ...query,
  });

  return res.send({
    status: 1,
    results: { classrooms, metadata: { total: count } },
  });
};

const updateClassroom = async (req, res) => {
  const updateFields = req.body;
  const { classroomId } = req.params;

  const classroom = await classroomService.updateClassroom({
    classroomId,
    updateFields,
  });

  return res.send({ status: 1, result: classroom });
};

const deleteClassroom = async (req, res) => {
  const accountId = req.account._id;
  const isAdmin = req.account.isAdmin;
  const { classroomId } = req.params;
  const classroom = await classroomService.findById({
    classroomId,
  });
  if (String(classroom.createdBy.accountId) == String(accountId)||isAdmin) {
    await classroomService.deleteClassroom({
      classroomId,
    });
    return res.send({ status: 1 });
  }
  return res.send({ status: 0, message: 'Permistion denined' });
};

module.exports = {
  createClassroom,
  getClassroom,
  getClassrooms,
  updateClassroom,
  deleteClassroom,
};
