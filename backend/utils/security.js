const crypto = require('crypto');

const { PEPPER } = process.env; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET_KEY } = process.env;
const JWT_EXPIRES_TIME = 24 * 60 * 60 * 1000;

async function generateAccessToken(email) {
  const accessToken = jwt.sign({ email }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_TIME,
  });

  return accessToken;
}

function generateSalt() {
  return bcrypt.genSaltSync(10);
}

function hashSHA512(text) {
  return crypto
    .createHash('sha512')
    .update(text)
    .digest('hex');
}

async function hashBcrypt(text, salt) {
  const hashedBcrypt = new Promise((resolve, reject) => {
    bcrypt.hash(text, salt, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
  return hashedBcrypt;
}

async function compareBcrypt(data, hashed) {
  const isCorrect = await new Promise((resolve, reject) => {
    bcrypt.compare(data, hashed, (err, same) => {
      if (err) reject(err);
      resolve(same);
    });
  });
  return isCorrect;
}

async function encryptPassword(password, salt) {
  // Transform the plaintext password to hash value using SHA512
  const hashedSHA512 = hashSHA512(password);

  // Hash using bcrypt with a cost of 10 and unique, per-user salt
  const hashedBcrypt = await hashBcrypt(hashedSHA512, salt);

  // Encrypt the resulting bcrypt hash with AES256
  const encryptAES256 = encrypt(hashedBcrypt);

  const encryptedPassword = encryptAES256;
  return encryptedPassword;
}

function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(PEPPER), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

function decrypt(text) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(
    'aes-256-ctr',
    Buffer.from(PEPPER),
    iv,
  );
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

module.exports = {
  decrypt,
  encrypt,
  encryptPassword,
  compareBcrypt,
  hashBcrypt,
  hashSHA512,
  generateAccessToken,
  generateSalt,
};
