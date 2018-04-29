const router = require('express').Router();
const Account = require('../models/account');
const crypto = require('crypto');

router.get('/getAuthor/:id', (req, res) => {
  Account.findById(req.params.id).then((acc, err) => {
    if (err) res.json(err);
    else {
      console.log(acc.email);
      acc.email = crypto
        .createHash('md5')
        .update(acc.email)
        .digest('hex');
      res.json(acc);
    }
  });
});

module.exports = router;
