const router = require('express').Router();
const axios = require('axios');

router.get('/getNSE', (req, res) => {
  axios.get('https://nseindia.com/homepage/Indices1.json').then(response => {
    response.data.data[1].url = 'https://nseindia.com';
    res.json(response.data);
  });
});

router.get('/getSENSEX', (req, res) => {
  axios
    .get('https://www.bseindia.com/markets/Equity/SensexData.aspx')
    .then(response => {
      // Response comes like this: "bse$#$SENSEX@34,501.27@-115.37@-0.33@mktlive/indiceswatch.asp?iname=BSE30&sensid=30&type=sens&graphpath=/applet/images/graf_appSENSEX.gif@25 Apr 18 | 16:00@2"

      let string = response.data;
      string.trim();
      string = string.substr(13, string.length - 13);
      let lastPrice = string.substr(0, string.indexOf('@'));

      let change = string.substr(lastPrice.length + 2);
      change = change.substr(0, change.indexOf('@'));

      let pChange = change.substr(change.length + 2);
      pChange = pChange.substr(0, pChange.indexOf('@'));

      res.json({
        lastPrice: lastPrice,
        change: change,
        name: 'SENSEX',
        pChange: pChange,
        url: 'https://bseindia.com'
      });
    });
});

module.exports = router;
