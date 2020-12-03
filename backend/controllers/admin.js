const adminService = require('../services/admin');

async function addAccount(req, res) {
  const { name, email } = req.body;
  const passwordDefault = '123456';
  const account = await adminService.addAccount({
    name,
    email,
    password: passwordDefault,
    accountId: req.account._id,
  });
  return res.send({ status: 1, result: { account } });
}

async function deleteAccount(req, res) {
  const adminId = req.account._id;
  const { deleteAccountId } = req.body;
  await adminService.deleteAccount({ deleteAccountId, adminId });
  return res.send({ status: 1 });
}

const getAllAccount = async (req, res) => {
  const adminId = req.account._id;
  const { search, fields, offset, limit, sort } = req.query;
  const query = {};
  query.query = { isAdmin: false };
  if (search) query.search = search;
  if (fields) query.fields = fields.split(',');
  if (offset) query.offset = parseInt(offset, 10);
  if (limit) query.limit = parseInt(limit, 10);
  if (sort) query.sort = sort.split(',');
  console.log(fields);
  Object.keys(req.query)
    .filter(
      q => ['search', 'fields', 'offset', 'limit', 'sort'].indexOf(q) === -1,
    )
    .forEach(q => {
      query.query[q] = JSON.parse(req.query[q]);
    });

  const { accounts, count } = await adminService.getAllAccount({
    adminId,
    ...query,
  });

  return res.send({
    status: 1,
    results: { accounts, metadata: { total: count } },
  });
};

module.exports = { addAccount, deleteAccount, getAllAccount };
