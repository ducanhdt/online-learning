const authService = require('../services/auth');

const login = async (req, res) => {
  const { email, password } = req.body;
  const accessToken = await authService.login(email, password);
  return res.send({ status: 1, result: { accessToken } });
};

async function register(req, res) {
  const { name, email } = req.body;
  const account = await authService.register({ name, email });
  return res.send({ status: 1, result: { account } });
}

const verifyAccessToken = async (req, res) => {
  const { accessToken } = req;
  console.log(accessToken);
  const { account } = await authService.verifyAccessToken(accessToken);
  res.send({ status: 1, result: { account } });
};

module.exports = {
  login,
  register,
  verifyAccessToken,
};
