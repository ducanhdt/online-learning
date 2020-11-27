const jwt = require('jsonwebtoken');
const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const Account = require('../models/account');

const { JWT_SECRET_KEY } = process.env;

const {
  decrypt,
  compareBcrypt,
  hashSHA512,
  generateAccessToken,
  generateSalt,
  encryptPassword,
} = require('../utils/security');

async function login(email, password) {
  const account = await Account.findOne({ email });
  if (!account)
    throw new CustomError(
      errorCodes.ACCOUNT_NOT_EXISTS,
      'Account is not exist.',
    );

  const isCorrectPassword = await compareBcrypt(
    hashSHA512(password),
    decrypt(account.password),
  );

  if (!isCorrectPassword)
    throw new CustomError(
      errorCodes.PASSWORD_NOT_MATCH,
      'Password is not match',
    );

  const accessToken = await generateAccessToken(email);

  return accessToken;
}

async function verifyAccessToken(accessToken) {
  const data = await jwt.verify(accessToken, JWT_SECRET_KEY);
  const { email } = data;
  const account = await Account.findOne({ email }).select(
    '_id name email avatar isAdmin',
  );
  if (!account) throw new CustomError(errorCodes.UNAUTHORIZED);

  return { data, account };
}

async function register({ name, email, password, isAdmin = false }) {
  const accountExist = await Account.findOne({ email });
  if (accountExist)
    throw new CustomError(errorCodes.ACCOUNT_EXISTS, 'Account already exists');

  const salt = generateSalt();

  const account = await Account.create({
    name,
    email,
    password: await encryptPassword(password, salt),
    isAdmin,
    salt,
  });

  return account;
}

module.exports = { login, verifyAccessToken, register };
