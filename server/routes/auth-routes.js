const router = require('express').Router();
const passport = require('passport');

// auth Login
router.post('/login', (req, res) => {});

// auth logout
router.get('/logout', (req, res) => {});

// auth with google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// callback route for google
router.get(
  '/google/redirect',
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

// auth with facebook
router.get('/facebook', passport.authenticate('facebook'));

// callback route for facebook
router.get(
  '/facebook/redirect',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

// auth with twitter
router.get('/twitter', passport.authenticate('twitter'));

// callback route for twitter
router.get(
  '/twitter/redirect',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
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
      'profile',
      'offline_access',
      'https://outlook.office.com/Mail.Read'
    ]
  })
);

// callback for microsoft
router.get(
  '/microsoft/redirect',
  passport.authenticate('windowslive', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  }
);

module.exports = router;
