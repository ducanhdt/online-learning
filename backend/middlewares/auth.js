// Tại middleware này sẽ kiểm tra xem người gửi request có đang đăng nhập hệ thống không,
// hay nói cách khác là có gửi accessToken kèm theo header không
// Nếu có thì thông tin của người đó sẽ lấy được từ req.account

// const camelCase = require('camelcase-keys');
const asyncMiddleware = require('./async');
const CustomError = require('../errors/CustomError');
const codes = require('../errors/code');
const authService = require('../services/auth');

async function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) throw new CustomError(codes.UNAUTHORIZED);

  const [tokenType, accessToken] = authorization.split(' ');
  if (tokenType !== 'Bearer') throw new Error();

  const { account } = await authService.verifyAccessToken(accessToken);

  req.account = account;
  if (['/auths/logout', '/auths/verify'].includes(req.path)) {
    req.accessToken = accessToken;
  }
  return next();
}

module.exports = asyncMiddleware(auth);
