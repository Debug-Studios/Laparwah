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
const compression = require('compression');
const express = require('express');
const app = express();
app.use(compression());
const history = require('connect-history-api-fallback');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const passport = require('passport');
const chalk = require('chalk');

// Enable CORS
app.use(cors());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../client'));

app.use(morgan('tiny'));

// Connect History
app.use(
  history({
    index: '/',
    rewrites: [
      {
        from: /^\/dashboard\/.*$/,
        to: function (context) {
          return context.parsedUrl.pathname;
        }
      },
      {
        from: /^\/auth\/.*$/,
        to: function (context) {
          return context.parsedUrl.pathname;
        }
      },
      {
        from: /^\/news\/.*$/,
        to: function (context) {
          return context.parsedUrl.pathname;
        }
      },
      {
        from: /^\/author\/.*$/,
        to: function (context) {
          return context.parsedUrl.pathname;
        }
      },
      {
        from: /^\/stocks\/.*$/,
        to: function (context) {
          return context.parsedUrl.pathname;
        }
      },
      {
        from: /^\/weather\/.*$/,
        to: function (context) {
          return context.parsedUrl.pathname;
        }
      }
    ],
    verbose: true
  })
);

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
const newsRoutes = require('./routes/news-routes');
app.use('/news', newsRoutes);
const authorRoutes = require('./routes/author-routes');
app.use('/author', authorRoutes);
const stockRoutes = require('./routes/stocks-routes');
app.use('/stocks', stockRoutes);
const weatherRoutes = require('./routes/weather-routes');
app.use('/weather', weatherRoutes);
const dashboardRoutes = require('./routes/dashboard-routes');
app.use('/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/client/index.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/client/dashboard.html'));
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
