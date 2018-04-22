const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const cookieSession = require('cookie-session');
const cookieSecret = require('./config/credentials/cookieSecret');
const passport = require('passport');
const dynamo = require('dynamodb');
const chalk = require('chalk');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../client'));

app.use(morgan('tiny'));

// Enable CORS
app.use(cors());

// Use Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));

// DynamoDB
dynamo.AWS.config.loadFromPath(
  path.join(__dirname, '/config/credentials/aws.json')
);
dynamo.AWS.config.update({ region: 'us-west-2' });
require('./models/account');
require('./models/newspost');
require('./config/passport-setup');
dynamo.createTables(err => {
  if (err) console.log('Error when trying to create tables', err);
});

// Serve static files from dist
app.use(express.static('dist'));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [cookieSecret.cookieKey]
  })
);

// PassportJS Config
app.use(passport.initialize());
app.use(passport.session());

// Set-up Routes
const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);
const accountRoutes = require('./routes/account-routes');
app.use('/accounts', accountRoutes);
const dashboardRoutes = require('./routes/dashboard-routes');
app.use('/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/client/index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  // Logs error
  console.log(chalk.red(err));
  res.status(500).render('error', { error: err });
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '../client/404.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening');
});
