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
  if (req.user.roles.includes('editor')) {
    next();
  } else {
    res.status(403).send('Sorry, you are not allowed to see that');
  }
}

function IsAdmin (req, res, next) {
  if (req.user.roles.includes('admin')) {
    next();
  } else {
    res.status(403).send('Sorry, you are not allowed to see that');
  }
}

// For Admin
router.get('/allAccounts', IsAdmin, (req, res) => {});

router.get('/createAccount', IsAdmin, (req, res) => {});

router.post('/editAccount/:email', IsAdmin, (req, res) => {});

router.get('/deleteAccount/:email', IsAdmin, (req, res) => {});

router.get('/allNewsPosts', IsAdmin, (req, res) => {});

router.post('/editNewsPost/:id', IsAdmin, (req, res) => {});

router.get('/deleteNewsPost/:id', IsAdmin, (req, res) => {});

// For Editor
router.get('/createNewsPost', IsEditor, (req, res) => {
  News.create(
    {
      email: `${req.user.email}`,
      title: `${req.body.title}`,
      content: `${req.body.content}`,
      type: `${req.body.type}`
    },
    (err, news) => {
      if (err) res.json(err);
      else {
        res.json(news);
      }
    }
  );
});

router.get('/ownNewsPosts/:page', IsEditor, (req, res) => {
  News.get(`${req.user.email}`, (err, news) => {
    if (err) res.json(err);
    else {
      res.json(news);
    }
  });
});

router.get('/editNewsPost/:id', IsEditor, (req, res) => {
  News.update(
    {
      email: `${req.user.email}`,
      id: `${req.params.id}`,
      title: `${req.body.title}`,
      content: `${req.body.content}`,
      type: `${req.body.type}`
    },
    (err, news) => {
      if (err) res.json(err);
      else {
        res.json(news);
      }
    }
  );
});

router.get('/deleteOwnNewsPost/:id', IsEditor, (req, res) => {
  News.destroy(
    {
      email: `${req.user.email}`,
      id: `${req.params.id}`
    },
    (err, news) => {
      if (err) res.json(err);
      else {
        res.json(news);
      }
    }
  );
});

module.exports = router;
