const path = require('path');
const fs = require('fs');
// Set environment variables
if (
  fs.existsSync(path.join(__dirname, '/config/credentials/envVariables.env'))
) {
  require('dotenv').config({
    path: path.join(__dirname, '/config/credentials/envVariables.env')
  });
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const passport = require('passport');
const chalk = require('chalk');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../client'));

app.use(morgan('tiny'));

// Enable CORS
app.use(cors());

// Use Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB
mongoose.connect(`${process.env.mongoUri}`).then(
  () => {
    console.log(chalk.green('Mongo Running'));
  },
  err => {
    console.log(chalk.red(err));
  }
);
require('./models/account');
require('./models/news');
require('./config/passport-setup');

// Serve static files from dist
app.use(express.static('dist'));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.CookieKey]
  })
);

// PassportJS Config
app.use(passport.initialize());
app.use(passport.session());

// // Set-up Routes
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
