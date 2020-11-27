// Đây là nơi xử lý logic khi nhận được 1 yêu cầu
// Sau khi xử lý logic xong thi sẽ gọi đến Service để tương tác với Database thông qua Model

const templateService = require('../services/template');

const createTemplate = async (req, res) => {
  const createFields = req.body;
  const { botId } = req.params;

  const template = await templateService.createTemplate({
    accountId: req.account._id,
    botId,
    createFields,
  });

  return res.send({ status: 1, result: template });
};

const getTemplate = async (req, res) => {
  const { botId, templateId } = req.params;

  const template = await templateService.findById({
    accountId: req.account._id,
    botId,
    templateId,
  });

  return res.send({ status: 1, result: template });
};

const getTemplates = async (req, res) => {
  const { botId } = req.params;
  const { search, fields, offset, limit, sort } = req.query;
  const query = {};
  query.query = { bot: botId };

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

  const { templates, count } = await templateService.findAll({
    botId,
    accountId: req.account._id,
    ...query,
  });

  return res.send({
    status: 1,
    results: { templates, metadata: { total: count } },
  });
};

const updateTemplate = async (req, res) => {
  const updateFields = req.body;
  const { botId, templateId } = req.params;

  const template = await templateService.updateTemplate({
    botId,
    accountId: req.account._id,
    templateId,
    updateFields,
  });

  return res.send({ status: 1, result: template });
};

const deleteTemplate = async (req, res) => {
  const { botId, templateId } = req.params;

  await templateService.deleteTemplate({
    botId,
    accountId: req.account._id,
    templateId,
  });

  return res.send({ status: 1 });
};

module.exports = {
  createTemplate,
  getTemplate,
  getTemplates,
  updateTemplate,
  deleteTemplate,
};
