const router = require('express').Router();
const Account = require('../models/account');
const News = require('../models/newspost');

// Dashboard routes will always check (on every request) if a user is logged in or not.
router.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(403).send('Sorry, you are not allowed to see that');
  }
});

function IsEditor (req, res, next) {
  if (req.user.attrs.roles.includes('editor')) {
    next();
  } else {
    res.status(403).send('Sorry, you are not allowed to see that');
  }
}

function IsAdmin (req, res, next) {
  if (req.user.attrs.roles.includes('admin')) {
    next();
  } else {
    res.status(403).send('Sorry, you are not allowed to see that');
  }
}

// All Accounts
router.get('/allAccounts', IsAdmin, (req, res) => {});

// Create User

// Edit User

// Delete User

// All News Posts

// Create News Post

// Edit News Post

// Delete News Posts

module.exports = router;
