// Có 2 cách trả về message là viết tại đây hoặc là viết trong CustomError
// Nhưng viết tại đây hay hơn cho nó tập trung

const codes = require('./code');

function getErrorMessage(code) {
  switch (code) {
    case codes.BOT_NOT_EXISTS:
      return 'Bot is not exists or you have not the permission to access this bot';
    case codes.TEMPLATE_NOT_EXISTS:
      return 'Template is not exists';
    case codes.TEMPLATE_EXISTS:
      return 'Template is exists';
    case codes.ACCOUNT_EXISTS:
      return 'Account is exists';
    default:
      return null;
  }
}

module.exports = getErrorMessage;
