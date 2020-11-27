const config = require('../utils/video-config');
const { videoToken } = require('../utils/video');

const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      token: token.toJwt(),
    }),
  );
};

const getVideoToken = (req, res) => {
  const identity = req.query.identity;
  const room = req.query.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
};
const postVideoToken = (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  console.log(token);
  sendTokenResponse(token, res);
};
module.exports = {
  getVideoToken,
  postVideoToken,
};
