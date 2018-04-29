const router = require('express').Router();
const Account = require('../models/account');

function IsLoggedIn (req, res, next) {
  if (req.user) {
    next();
  } else {
    res.sendStatus(403);
  }
}

router.get('/getCurrentUser', (req, res) => {
  if (req.user) {
    res.json({
      isLoggedin: 'true',
      user: {
        name: req.user.name,
        email: req.user.email,
        roles: req.user.roles,
        designation: req.user.designation
      }
    });
  } else {
    res.json({ isLoggedin: 'false', user: null });
  }
});

// Send Complete User
router.get('/getCurrentUserDetails', (req, res) => {
  if (req.user) {
    res.json({ isLoggedin: 'true', user: req.user });
  } else {
    res.json({ isLoggedin: 'false', user: null });
  }
});

// Update User Profile
router.post('/updateAccount', IsLoggedIn, (req, res) => {
  Account.findOneAndUpdate(
    {
      email: `${req.user.email}`
    },
    {
      name: `${req.body.name}`,
      age: `${req.body.age}`,
      gender: `${req.body.gender}`
    },
    (err, acc) => {
      if (err) res.status(500);
      else {
        res.status(200).json(acc);
      }
    }
  );
});

// Delete Account Route
router.delete('/deleteAccount', IsLoggedIn, (req, res) => {
  Account.destroy(`${req.user.email}`, err => {
    if (err) res.json({ error: err });
    else {
      res.redirect('/');
    }
  });
});

module.exports = router;
