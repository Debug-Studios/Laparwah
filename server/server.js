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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/client/index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening');
});
