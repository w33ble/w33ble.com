require('dotenv').load();

const path = require('path');
const express = require('express');
const routes = require('./routes');
const mwLogger = require('./lib/middleware/logger');

const app = express();

if (process.env.TRUST_PROXY === 'yes') app.enable('trust proxy');

app.set('port', (process.env.PORT || 8080));

app.use(mwLogger.access);

app.use(express.static(path.resolve(__dirname, 'public'), {
  index: false,
  maxAge: '1d'
}));

app.use('/', routes);

app.get('*', function (req, res) {
  res.redirect(302, '/');
});

app.use(mwLogger.error);

app.listen(app.get('port'), function () {
  console.log('Server listening on port', app.get('port'));
});