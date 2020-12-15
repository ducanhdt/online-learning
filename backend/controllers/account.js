const accountService = require('../services/account.js');
const classService = require('../services/classroom')
const Account = require('../models/account');

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  await accountService.changePassword({
    id: req.account._id,
    currentPassword,
    newPassword,
  });
  res.send({ status: 1 });
};

const changeInfo = async (req, res) => {
  const { updateDatas } = req.body;
  await accountService.changeInfo({
    id: req.account._id,
    updateDatas,
  });
  res.send({ status: 1 });
};

async function getClassroom(req, res) {
  const id = req.account._id;
  const classroomId = await accountService.getClassroom({ id });
  return res.send({ status: 1, result:{classroomId} });
}

async function removeClassroom(req, res) {
  const { classroomId,accountId } = req.body;
  const id = accountId?accountId:req.account._id;
  await accountService.removeClassroom({ id, classroomId });
  await classService.deleteMember({classroomId,accountId:id})
  return res.send({ status: 1 });
}

async function addClassroom(req, res) {
  const { classroomId,email } = req.body;
  const account = await Account.findOne({ email });
  if (!account)
    throw new CustomError(
      errorCodes.ACCOUNT_NOT_EXISTS,
      'Account is not exist.',
    );
  const id = account?account._id:req.account._id;
  await accountService.addClassroom({ classroomId, id });

  await classService.addMember({classroomId,accountId:id})
  return res.send({ status: 1 });
}

module.exports = {
  changePassword,
  changeInfo,
  addClassroom,
  removeClassroom,
  getClassroom,
};
