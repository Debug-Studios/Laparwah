const router = require('express').Router();
const Account = require('../models/account');
const News = require('../models/news');

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

function IsWriter (req, res, next) {
  if (req.user.roles.includes('writer')) {
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
router.get('/allAccounts/:page', IsAdmin, (req, res) => {
  Account.find()
    .skip((req.params.page - 1) * 10)
    .limit(10)
    .exec((err, users) => {
      if (err) res.json(err);
      else {
        res.json(users);
      }
    });
});

router.post('/createAccount', IsAdmin, (req, res) => {
  Account.create(
    {
      email: req.body.email,
      username: req.body.username,
      name: req.body.name,
      gender: req.body.gender,
      roles: req.body.roles.split(' ')
    },
    (err, newAcc) => {
      if (err) {
        res.json(err);
      } else {
        res.json(newAcc);
      }
    }
  );
});

router.get('/editAccount/:id', IsAdmin, (req, res) => {
  Account.findById(req.params.id, (err, acc) => {
    if (err) {
      res.json(err);
    }
    res.json(acc);
  });
});

router.post('/editAccount/:id', IsAdmin, (req, res) => {
  Account.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      gender: req.body.gender,
      roles: req.body.roles.split(' '),
      username: req.body.username
    },
    (err, acc) => {
      if (err) {
        res.json(err);
      }
      res.json(acc);
    }
  );
});

router.delete('/deleteAccount/:id', IsAdmin, (req, res) => {
  Account.findByIdAndRemove(req.params.id, (err, delAcc) => {
    if (err) {
      res.json(err);
    }
    res.json(delAcc);
  });
});

router.get('/allNewsPosts/:page', IsAdmin, (req, res) => {
  News.find()
    .skip((req.params.page - 1) * 10)
    .limit(10)
    .exec((err, news) => {
      if (err) res.json(err);
      else {
        res.json(news);
      }
    });
});

router.get('/editNewsPost/:id', IsAdmin, (req, res) => {
  News.findById(req.params.id, (err, news) => {
    if (err) res.json(err);
    else {
      res.json(news);
    }
  });
});

router.post('/editNewsPost/:id', IsAdmin, (req, res) => {
  News.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      heroImage: req.body.heroImage,
      main_tag: req.body.tag,
      tags: req.body.tags.split(' ')
    },
    (err, news) => {
      if (err) res.json(err);
      else {
        res.json(news);
      }
    }
  );
});

router.delete('/deleteNewsPost/:id', IsAdmin, (req, res) => {
  News.findOneAndRemove(
    {
      _id: req.params.id
    },
    (err, news) => {
      if (err) res.json(err);
      else {
        res.json(news);
      }
    }
  );
});

// For Writer
router.post('/createNewsPost', IsWriter, (req, res) => {
  News.create(
    {
      creator: req.user._id,
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      locale: req.body.locale,
      heroImage: req.body.heroImage,
      main_tag: req.body.main_tag,
      tags: req.body.tags.split(' '),
      url: req.body.url
    },
    (err, news) => {
      if (err) res.json(err);
      else {
        res.json(news);
      }
    }
  );
});

router.get('/ownNewsPosts/:page', IsWriter, (req, res) => {
  News.find({ creator: req.user._id })
    .skip((req.params.page - 1) * 10)
    .limit(10)
    .exec((err, news) => {
      if (err) res.json(err);
      else {
        res.json(news);
      }
    });
});

router.get('/editOwnNewsPost/:id', IsWriter, (req, res) => {
  News.findOne(
    {
      _id: req.params.id,
      creator: req.user._id
    },
    (err, news) => {
      if (err) res.json(err);
      else {
        res.json(news);
      }
    }
  );
});

router.post('/editOwnNewsPost/:id', IsWriter, (req, res) => {
  News.findOneAndUpdate(
    {
      _id: req.params.id,
      creator: req.user._id
    },
    {
      creator: req.user._id,
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      locale: req.body.locale,
      heroImage: req.body.heroImage,
      main_tag: req.body.main_tag,
      tags: req.body.tags.split(' ')
    },
    (err, news) => {
      if (err) res.json(err);
      else {
        res.json(news);
      }
    }
  );
});

router.delete('/deleteOwnNewsPost/:id', IsWriter, (req, res) => {
  News.findOneAndRemove(
    {
      _id: req.params.id,
      creator: req.user._id
    },
    (err, news) => {
      if (err) res.json(err);
      else {
        res.json(news);
      }
    }
  );
});

// Moderation Queue
router.get('/moderationQueue/:page', IsEditor, (req, res) => {
  if (IsAdmin) {
    News.find({})
      .or([
        { 'approval.done': true },
        { 'approval.mod1': false },
        { 'approval.mod2': false }
      ])
      .skip((req.params.page - 1) * 10)
      .limit(10)
      .exec((err, news) => {
        if (err) res.json(err);
        else {
          res.json(news);
        }
      });
  } else if (IsEditor) {
    News.find({})
      .where('approval.done')
      .equals(false)
      .skip((req.params.page - 1) * 10)
      .limit(10)
      .exec((err, news) => {
        if (err) res.json(err);
        else {
          res.json(news);
        }
      });
  }
});

module.exports = router;
