const ruleService = require('../services/rule');

const createRule = async (req, res) => {
  const createFields = req.body;
  const { botId } = req.params;

  const rule = await ruleService.createRule({
    accountId: req.account._id,
    botId,
    createFields,
  });

  return res.send({ status: 1, result: rule });
};

const getRule = async (req, res) => {
  const { botId, ruleId } = req.params;

  const rule = await ruleService.findById({
    accountId: req.account._id,
    botId,
    ruleId,
  });

  return res.send({ status: 1, result: rule });
};

const getRules = async (req, res) => {
  const { botId } = req.params;
  const { search, fields, offset, limit, sort } = req.query;
  const query = {};
  query.query = { botId };

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

  const { rules, count } = await ruleService.findAll({
    botId,
    accountId: req.account._id,
    ...query,
  });

  return res.send({
    status: 1,
    results: { rules, metadata: { total: count } },
  });
};

const updateRule = async (req, res) => {
  const updateFields = req.body;
  const { botId, ruleId } = req.params;

  const rule = await ruleService.updateRule({
    botId,
    accountId: req.account._id,
    ruleId,
    updateFields,
  });

  return res.send({ status: 1, result: rule });
};

const deleteRule = async (req, res) => {
  const { botId, ruleId } = req.params;

  await ruleService.deleteRule({
    botId,
    accountId: req.account._id,
    ruleId,
  });

  return res.send({ status: 1 });
};

module.exports = {
  createRule,
  getRule,
  getRules,
  updateRule,
  deleteRule,
};
