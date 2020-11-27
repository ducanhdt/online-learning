// Tại đây sẽ tương tác với Database để xử lý dữ liệu
// Có một số điểm cần chú ý là:
// Kiểu dữ liệu nếu là ObjectId thì cần convert
// Có 2 loại bắn ra lỗi, 1 là bắn ra lỗi mặc định, 2 là dùng CustomError để custom lỗi
// Đến đây thì qua folder errors để đọc nhé

const { ObjectId } = require('mongoose').Types;

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const Template = require('../models/template');
const Bot = require('../models/bot');

const dbUtil = require('../utils/db');

const createTemplate = async ({ accountId, botId, createFields }) => {
  const bot = await Bot.findOne({
    _id: ObjectId(botId),
    'roles.account': accountId,
  });
  if (!bot) throw new CustomError(errorCodes.BOT_NOT_EXISTS);

  const existTemplate = await Template.findOne({ name: createFields.name });
  if (existTemplate) throw new CustomError(errorCodes.TEMPLATE_EXISTS);

  let template = await Template.create({
    ...createFields,
    bot: ObjectId(botId),
  });
  template = await template
    .populate({ path: 'bot', select: 'name logo' })
    .execPopulate();

  return template;
};

const findById = async ({ botId, accountId, templateId }) => {
  const bot = await Bot.findOne({
    _id: botId,
    'roles.account': accountId,
  });
  if (!bot) throw new CustomError(errorCodes.BOT_NOT_EXISTS);

  let template = await Template.findById(templateId);
  template = await template
    .populate({ path: 'bot', select: 'name logo' })
    .execPopulate();

  if (!template) throw new CustomError(errorCodes.TEMPLATE_NOT_EXISTS);

  return template;
};

const findAll = async ({
  botId,
  accountId,
  search,
  query,
  offset,
  limit,
  fields,
  sort = ['createdAt_asc'],
}) => {
  const bot = await Bot.findOne({
    _id: botId,
    'roles.account': accountId,
  });
  if (!bot) throw new CustomError(errorCodes.BOT_NOT_EXISTS);

  const { error, documents: templates, count } = await dbUtil.findAll(
    Template,
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

  return { templates, count };
};

const updateTemplate = async ({
  templateId,
  accountId,
  botId,
  updateFields,
}) => {
  const bot = await Bot.findOne({
    _id: botId,
    'roles.account': accountId,
  });
  if (!bot) throw new CustomError(errorCodes.BOT_NOT_EXISTS);

  let template = await Template.findByIdAndUpdate(templateId, updateFields, {
    new: true,
  });
  template = await template
    .populate({ path: 'bot', select: 'name logo' })
    .execPopulate();

  return template;
};

const deleteTemplate = async ({ botId, accountId, templateId }) => {
  const bot = await Bot.findOne({
    _id: botId,
    'roles.account': accountId,
  });
  if (!bot) throw new CustomError(errorCodes.BOT_NOT_EXISTS);

  await Template.findByIdAndDelete(templateId);
};

module.exports = {
  createTemplate,
  findById,
  findAll,
  updateTemplate,
  deleteTemplate,
};
