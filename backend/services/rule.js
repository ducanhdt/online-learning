const { ObjectId } = require('mongoose').Types;

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const Rule = require('../models/rule');
const Bot = require('../models/bot');

const dbUtil = require('../utils/db');

const createRule = async ({ accountId, botId, createFields }) => {
  const bot = await Bot.findOne({
    _id: ObjectId(botId),
    'roles.account': accountId,
  });
  if (!bot) throw new CustomError(errorCodes.BOT_NOT_EXISTS);

  const existRule = await Rule.findOne({ name: createFields.name });
  if (existRule) throw new CustomError(errorCodes.TEMPLATE_EXISTS);

  let rule = await Rule.create({
    ...createFields,
    botId: ObjectId(botId),
  });
  rule = await rule
    .populate({ path: 'bot', select: 'name logo' })
    .execPopulate();

  return rule;
};

const findById = async ({ botId, accountId, ruleId }) => {
  const bot = await Bot.findOne({
    _id: botId,
    'roles.account': accountId,
  });
  if (!bot) throw new CustomError(errorCodes.BOT_NOT_EXISTS);

  let rule = await Rule.findById(ruleId);
  rule = await rule
    .populate({ path: 'bot', select: 'name logo' })
    .execPopulate();

  if (!rule) throw new CustomError(errorCodes.TEMPLATE_NOT_EXISTS);

  return rule;
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
  const { error, documents: rules, count } = await dbUtil.findAll(
    Rule,
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

  return { rules, count };
};

const updateRule = async ({ ruleId, accountId, botId, updateFields }) => {
  const bot = await Bot.findOne({
    _id: botId,
    'roles.account': accountId,
  });
  if (!bot) throw new CustomError(errorCodes.BOT_NOT_EXISTS);

  let rule = await Rule.findByIdAndUpdate(ruleId, updateFields, {
    new: true,
  });
  rule = await rule
    .populate({ path: 'bot', select: 'name logo' })
    .execPopulate();

  return rule;
};

const deleteRule = async ({ botId, accountId, ruleId }) => {
  const bot = await Bot.findOne({
    _id: botId,
    'roles.account': accountId,
  });
  if (!bot) throw new CustomError(errorCodes.BOT_NOT_EXISTS);

  await Rule.findByIdAndDelete(ruleId);
};

module.exports = {
  createRule,
  findById,
  findAll,
  updateRule,
  deleteRule,
};
