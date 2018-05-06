const router = require('express').Router();
const News = require('../models/news');
const Account = require('../models/account');
const showdown = require('showdown');
const converter = new showdown.Converter({
  simplifiedAutoLink: true,
  strikethrough: true
});
const crypto = require('crypto');

function IsLoggedIn (req, res, next) {
  if (req.user) {
    next();
  } else {
    res.sendStatus(403);
  }
}

router.get('/getNewsPost/:url', (req, res) => {
  News.findOne({ url: req.params.url })
    .populate('creator', 'name _id email')
    .populate('co_creator', 'name _id email')
    .exec((err, news) => {
      if (err) res.json(err);
      else {
        news.creator.email = crypto
          .createHash('md5')
          .update(news.creator.email)
          .digest('hex');
        if (news.co_creator) {
          news.co_creator.email = crypto
            .createHash('md5')
            .update(news.co_creator.email)
            .digest('hex');
        }
        news.content = converter.makeHtml(news.content);
        res.json(news);
      }
    });
});

// Get Breaking List
router.get('/getBreaking/:count', (req, res) => {
  News.find({
    main_tag: 'Breaking News'
  })
    .or([
      { 'approval.mod1': true },
      { 'approval.mod2': true },
      { 'approval.mod3': true },
      { 'approval.admin': true }
    ])
    .limit(parseInt(req.params.count))
    .sort({ updated_at: 'desc' })
    .select({ content: 0 })
    .populate('creator', 'name _id')
    .exec((err, news) => {
      if (err) res.json(err);
      else res.json(news);
    });
});

// #region Types of News
router.get('/getSpotlights/:count', (req, res) => {
  News.find({
    main_tag: 'Spotlight'
  })
    .or([
      { 'approval.mod1': true },
      { 'approval.mod2': true },
      { 'approval.mod3': true },
      { 'approval.admin': true }
    ])
    .limit(parseInt(req.params.count))
    .sort({ updated_at: 'desc' })
    .select({ content: 0 })
    .populate('creator', 'name _id')
    .exec((err, news) => {
      if (err) res.json(err);
      else res.json(news);
    });
});

// Get Politics News
router.get('/getPolitics/:count', (req, res) => {
  News.find({
    category: 'Politics'
  })
    .or([
      { 'approval.mod1': true },
      { 'approval.mod2': true },
      { 'approval.mod3': true },
      { 'approval.admin': true }
    ])
    .limit(parseInt(req.params.count))
    .sort({ updated_at: 'desc' })
    .select({ content: 0 })
    .exec((err, news) => {
      if (err) res.json(err);
      else res.json(news);
    });
});

// Get Money News
router.get('/getMoney/:count', (req, res) => {
  News.find({
    category: 'Money'
  })
    .or([
      { 'approval.mod1': true },
      { 'approval.mod2': true },
      { 'approval.mod3': true },
      { 'approval.admin': true }
    ])
    .limit(parseInt(req.params.count))
    .sort({ updated_at: 'desc' })
    .select({ content: 0 })
    .exec((err, news) => {
      if (err) res.json(err);
      else res.json(news);
    });
});

// Get Entertainment News
router.get('/getEntertainment/:count', (req, res) => {
  News.find({
    category: 'Entertainment'
  })
    .or([
      { 'approval.mod1': true },
      { 'approval.mod2': true },
      { 'approval.mod3': true },
      { 'approval.admin': true }
    ])
    .limit(parseInt(req.params.count))
    .sort({ updated_at: 'desc' })
    .select({ content: 0 })
    .exec((err, news) => {
      if (err) res.json(err);
      else res.json(news);
    });
});

// Get Tech News
router.get('/getTech/:count', (req, res) => {
  News.find({
    category: 'Tech'
  })
    .or([
      { 'approval.mod1': true },
      { 'approval.mod2': true },
      { 'approval.mod3': true },
      { 'approval.admin': true }
    ])
    .limit(parseInt(req.params.count))
    .sort({ updated_at: 'desc' })
    .select({ content: 0 })
    .exec((err, news) => {
      if (err) res.json(err);
      else res.json(news);
    });
});

// Get Sports News
router.get('/getSports/:count', (req, res) => {
  News.find({
    category: 'Sports'
  })
    .or([
      { 'approval.mod1': true },
      { 'approval.mod2': true },
      { 'approval.mod3': true },
      { 'approval.admin': true }
    ])
    .limit(parseInt(req.params.count))
    .sort({ updated_at: 'desc' })
    .select({ content: 0 })
    .exec((err, news) => {
      if (err) res.json(err);
      else res.json(news);
    });
});

// Get Travel News
router.get('/getTravel/:count', (req, res) => {
  News.find({
    category: 'Travel'
  })
    .or([
      { 'approval.mod1': true },
      { 'approval.mod2': true },
      { 'approval.mod3': true },
      { 'approval.admin': true }
    ])
    .limit(parseInt(req.params.count))
    .sort({ updated_at: 'desc' })
    .select({ content: 0 })
    .exec((err, news) => {
      if (err) res.json(err);
      else res.json(news);
    });
});

// Get Health News
router.get('/getHealth/:count', (req, res) => {
  News.find({
    category: 'Health'
  })
    .or([
      { 'approval.mod1': true },
      { 'approval.mod2': true },
      { 'approval.mod3': true },
      { 'approval.admin': true }
    ])
    .limit(parseInt(req.params.count))
    .sort({ updated_at: 'desc' })
    .select({ content: 0 })
    .exec((err, news) => {
      if (err) res.json(err);
      else res.json(news);
    });
});

// Get Culture News
router.get('/getCulture/:count', (req, res) => {
  News.find({
    category: 'Culture'
  })
    .or([
      { 'approval.mod1': true },
      { 'approval.mod2': true },
      { 'approval.mod3': true },
      { 'approval.admin': true }
    ])
    .limit(parseInt(req.params.count))
    .sort({ updated_at: 'desc' })
    .select({ content: 0 })
    .exec((err, news) => {
      if (err) res.json(err);
      else res.json(news);
    });
});

// #endregion

// #region Likes

router.get('/currentLikeStatus/:newsId', IsLoggedIn, (req, res) => {
  Account.find({ likes: req.params.newsId })
    .count()
    .exec((err, count) => {
      if (err) res.json(false);
      else {
        if (count > 0) {
          res.json(true);
        } else {
          res.json(false);
        }
      }
    });
});

router.get('/like/:newsId', IsLoggedIn, (req, res) => {
  Account.findByIdAndUpdate(
    req.user._id,
    {
      $push: { likes: req.params.newsId }
    },
    (err, acc) => {
      if (err) res.json(err);
      else {
        res.json(true);
      }
    }
  );
});

router.get('/unlike/:newsId', IsLoggedIn, (req, res) => {
  Account.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { likes: req.params.newsId }
    },
    (err, acc) => {
      if (err) res.json(err);
      else {
        res.json(true);
      }
    }
  );
});

// #endregion

module.exports = router;
