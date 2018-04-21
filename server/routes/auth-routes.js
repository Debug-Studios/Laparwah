const router = require('express').Router();
const passport = require('passport');

router.get('/getCurrentUser', (req, res) => {
  if (req.user) {
    res.json({ isLoggedin: 'true', user: req.user });
  } else {
    res.json({ isLoggedin: 'false', user: null });
  }
});

// auth logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// auth with google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// callback route for google
router.get(
  '/google/redirect',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/auth/getCurrentUser');
  }
);

// auth with facebook
router.get('/facebook', passport.authenticate('facebook'));

// callback route for facebook
router.get(
  '/facebook/redirect',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

// auth with twitter
router.get('/twitter', passport.authenticate('twitter'));

// callback route for twitter
router.get(
  '/twitter/redirect',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

// auth with microsoft
router.get(
  '/microsoft',
  passport.authenticate('windowslive', {
    scope: [
      'openid',
      'email',
      'profile',
      'offline_access',
      'https://outlook.office.com/Mail.Read'
    ]
  })
);

// callback for microsoft
router.get(
  '/microsoft/redirect',
  passport.authenticate('windowslive', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  }
);

module.exports = router;
