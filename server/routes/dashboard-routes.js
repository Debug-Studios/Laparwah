const router = require('express').Router();
const Account = require('../models/account');
const News = require('../models/news');

// Dashboard routes will always check (on every request) if a user is logged in or not.
// router.use((req, res, next) => {
//   if (req.user) {
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// });

function IsEditor (req, res, next) {
  if (req.user.roles.includes('editor')) {
    next();
  } else {
    res.sendStatus(403);
  }
}

function IsAdmin (req, res, next) {
  // TODO: Remove
  next();
  // if (req.user.roles.includes('admin')) {
  //   next();
  // } else {
  //   res.sendStatus(403);
  // }
}

// For Admin
router.get('/allAccounts/:page', IsAdmin, (req, res) => {
  Account.find()
    .skip((req.params.page - 1) * 10)
    .limit(10)
    .exec((err, news) => {
      if (err) res.json(err);
      else {
        res.json(news);
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

router.post('/editAccount/:email', IsAdmin, (req, res) => {
  Account.findOneAndUpdate(
    {
      email: req.params.email
    },
    {
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
  Account.findOneAndRemove({ email: req.body.email }, (err, delAcc) => {
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

router.post('/editNewsPost/:email/:id', IsAdmin, (req, res) => {
  News.findByIdAndUpdate(
    req.params.id,
    {
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
  News.findOneAndRemove(
    {
      email: `${req.params.email}`
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
      creator_id: `${req.user._id}`,
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
  News.find({ creator_email: req.user.email })
    .skip((req.params.page - 1) * 10)
    .limit(10)
    .exec((err, news) => {
      if (err) res.json(err);
      else {
        res.json(news);
      }
    });
});

router.get('/editNewsPost/:id', IsEditor, (req, res) => {
  News.findOneAndUpdate(
    {
      id: req.params.id
    },
    {
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
  News.findOneAndRemove(
    { _id: req.params.id, email: req.user.email },
    (err, news) => {
      if (err) res.json(err);
      else {
        res.json(news);
      }
    }
  );
});

module.exports = router;
