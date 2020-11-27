const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

const camelCaseReq = require('./middlewares/camelCaseReq');
const snakeCaseRes = require('./middlewares/snakeCaseRes');
const errorHandler = require('./middlewares/errorHandler');

require('dotenv').config();
require('./models');

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(camelCaseReq);
app.use(snakeCaseRes());

require('./routes')(app);

app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
