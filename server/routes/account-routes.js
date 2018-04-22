const router = require('express').Router();
const Account = require('../models/account');

function IsLoggedIn (req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(403).send('Sorry, you are not allowed to see that');
  }
}

router.get('/getCurrentUser', (req, res) => {
  if (req.user) {
    res.json({
      isLoggedin: 'true',
      user: { name: req.user.attrs.name, email: req.user.attrs.email }
    });
  } else {
    res.json({ isLoggedin: 'false', user: null });
  }
});

// Send Complete User
router.get('/getCurrentUserDetails', (req, res) => {
  if (req.user) {
    res.json({ isLoggedin: 'true', user: req.user.attrs });
  } else {
    res.json({ isLoggedin: 'false', user: null });
  }
});

// Update User Profile
router.post('/updateAccount', IsLoggedIn, (req, res) => {
  Account.update(
    {
      email: `${req.user.attrs.email}`,
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
router.get('/deleteAccount', IsLoggedIn, (req, res) => {
  Account.destroy(`${req.user.attrs.email}`, err => {
    if (err) res.json({ error: err });
    else {
      res.redirect('/');
    }
  });
});

module.exports = router;
