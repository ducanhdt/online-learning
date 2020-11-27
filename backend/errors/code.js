// Đây là nơi exports ra các mã lỗi cùng tên, có thể gọi đây là enum của lỗi cũng được
// Message trả về thì qua message đọc

module.exports = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  ACCOUNT_NOT_EXISTS: 1001,
  ACCOUNT_EXISTS: 1002,
  PASSWORD_NOT_MATCH: 1003,
  BOT_NOT_EXISTS: 1004,
  TEMPLATE_NOT_EXISTS: 1005,
  TEMPLATE_EXISTS: 1006,
};
