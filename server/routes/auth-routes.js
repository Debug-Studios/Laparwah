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
router.get('/facebook', (req, res) => {});

// auth with twitter
router.get('/twitter', (req, res) => {});

// auth with microsoft
router.get('/microsoft', (req, res) => {});

module.exports = router;
