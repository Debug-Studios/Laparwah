const router = require('express').Router();
const News = require('../models/news');

// Get Breaking List
router.get('/getBreaking/:count', (req, res) => {
  News.find({
    main_tag: 'Breaking News'
  })
    .limit(++req.params.count)
    .sort({ updated_at: 'desc' })
    .select({ content: 0 })
    .exec((err, news) => {
      if (err) res.json(err);
      else res.json(news);
    });
});

// Get Today's Spotlights News
router.get('/getSpotlights/:count', (req, res) => {
  News.find({
    main_tag: 'Spotlight'
  })
    .limit(+req.params.count)
    .sort({ updated_at: 'desc' })
    .select({ content: 0 })
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
    .limit(+req.params.count)
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
    .limit(+req.params.count)
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
    .limit(+req.params.count)
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
    .limit(+req.params.count)
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
    .limit(+req.params.count)
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
    .limit(+req.params.count)
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
    .limit(+req.params.count)
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
    .limit(+req.params.count)
    .sort({ updated_at: 'desc' })
    .select({ content: 0 })
    .exec((err, news) => {
      if (err) res.json(err);
      else res.json(news);
    });
});

module.exports = router;
