const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const dbUtil = require('../utils/db');
const Account = require('../models/account');
const authService = require('../services/auth');

async function addAccount({ name, email, password, accountId }) {
  const checkAdmin = await Account.findById(accountId);
  if (!checkAdmin)
    throw new CustomError(errorCodes.ACCOUNT_NOT_EXISTS, 'Account not exists');
  if (!checkAdmin.isAdmin)
    throw new CustomError(errorCodes.FORBIDDEN, 'Not having permission');

  const account = await authService.register({
    name,
    email,
    password,
    accountId,
  });
  return account;
}

async function deleteAccount({ deleteAccountId, adminId }) {
  const checkAdmin = await Account.findById(adminId);
  if (!checkAdmin)
    throw new CustomError(errorCodes.ACCOUNT_NOT_EXISTS, 'Admin not exists');
  if (!checkAdmin.isAdmin)
    throw new CustomError(errorCodes.FORBIDDEN, 'Not having permission');
  const toDeleteAccount = await Account.findById(deleteAccountId);
  if (!toDeleteAccount)
    throw new CustomError(errorCodes.ACCOUNT_NOT_EXISTS, 'Account not exists');
  if (toDeleteAccount.isAdmin)
    throw new CustomError(errorCodes.BAD_REQUEST, 'Not having permission');
  await Account.findByIdAndDelete(deleteAccountId);
  return toDeleteAccount;
}

const getAllAccount = async ({
  adminId,
  search,
  query,
  offset,
  limit,
  fields,
  sort = ['createdAt_asc'],
}) => {
  const checkAdmin = await Account.findById(adminId);
  if (!checkAdmin) throw new CustomError(errorCodes.ACCOUNT_NOT_EXISTS);
  if (!checkAdmin.isAdmin) throw new CustomError(errorCodes.BAD_REQUEST);
  const { error, documents: accounts, count } = await dbUtil.findAll(
    Account,
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

  return { accounts, count };
};

module.exports = { addAccount, deleteAccount, getAllAccount };
