const router = require('express').Router();
const Account = require('../models/account');
const News = require('../models/newspost');

// Dashboard routes will always check (on every request) if a user is logged in or not.
router.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(403);
  }
});

function IsEditor (req, res, next) {
  if (req.user.roles.includes('editor')) {
    next();
  } else {
    res.sendStatus(403);
  }
}

function IsAdmin (req, res, next) {
  if (req.user.roles.includes('admin')) {
    next();
  } else {
    res.sendStatus(403);
  }
}

// For Admin
router.get('/allAccounts', IsAdmin, (req, res) => {
  Account.scan().exec((err, resp) => {
    if (err) res.json(err);
    else {
      res.json(resp);
    }
  });
});

router.get('/createAccount', IsAdmin, (req, res) => {
  Account.create(
    {
      email: req.body.email,
      name: req.body.name,
      gender: req.body.gender,
      roles: req.body.roles.split(' '),
      settings: {
        nickname: req.body.nickname
      }
    },
    (err, newAcc) => {
      if (err) {
        res.json(err);
      }
      res.json(newAcc);
    }
  );
});

router.post('/editAccount/:email', IsAdmin, (req, res) => {
  Account.update(
    {
      email: req.params.email,
      name: req.body.name,
      gender: req.body.gender,
      roles: req.body.roles.split(' '),
      settings: {
        nickname: req.body.nickname
      }
    },
    (err, acc) => {
      if (err) {
        res.json(err);
      }
      res.json(acc);
    }
  );
});

router.get('/deleteAccount/:email', IsAdmin, (req, res) => {
  Account.destroy(`${req.body.email}`, (err, delAcc) => {
    if (err) {
      res.json(err);
    }
    res.json(delAcc);
  });
});

router.get('/allNewsPosts', IsAdmin, (req, res) => {
  News.scan().exec((err, resp) => {
    if (err) res.json(err);
    else {
      res.json(resp);
    }
  });
});

router.post('/editNewsPost/:email/:id', IsAdmin, (req, res) => {
  News.update(
    {
      email: `${req.params.email}`,
      id: `${req.params.id}`,
      title: `${req.body.title}`,
      content: `${req.body.content}`,
      category: `${req.body.category}`,
      heroImage: `${req.body.heroImage}`,
      tag: `${req.body.tag}`
    },
    (err, news) => {
      if (err) res.json(err);
      else {
        res.json(news);
      }
    }
  );
});

router.delete('/deleteNewsPost/:email/:id', IsAdmin, (req, res) => {
  News.destroy(
    {
      email: `${req.params.email}`,
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

// For Editor
router.get('/createNewsPost', IsEditor, (req, res) => {
  News.create(
    {
      email: `${req.user.email}`,
      id: `${req.params.id}`,
      title: `${req.body.title}`,
      content: `${req.body.content}`,
      category: `${req.body.category}`,
      heroImage: `${req.body.heroImage}`,
      tag: `${req.body.tag}`
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
      category: `${req.body.category}`,
      heroImage: `${req.body.heroImage}`,
      tag: `${req.body.tag}`
    },
    (err, news) => {
      if (err) res.json(err);
      else {
        res.json(news);
      }
    }
  );
});

router.delete('/deleteOwnNewsPost/:id', IsEditor, (req, res) => {
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
