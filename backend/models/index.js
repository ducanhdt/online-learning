const mongoose = require('mongoose');
const Account = require('./account');
const authService = require('../services/auth');

const {
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DATABASE,
  ADMIN_NAME,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
} = process.env;

const mongoUri = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;

mongoose.connect(mongoUri, {
  autoIndex: false,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error.');
  console.error(err);
  process.exit();
});

mongoose.connection.once('open', () => {
  console.log(`Connected to MongoDB: ${mongoUri}`);
});

(async () => {
  const admin = await Account.findOne({ isAdmin: true });
  if (!admin) {
    await authService.register({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      isAdmin: true,
    });
  }
})();
