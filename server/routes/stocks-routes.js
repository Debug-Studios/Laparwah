const router = require('express').Router();
const axios = require('axios');

router.get('/getNSE', (req, res) => {
  axios.get('https://nseindia.com/homepage/Indices1.json').then(response => {
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
      let lastPrice = string.substr(0, string.indexOf('@', 0));
      let change = string.substr(
        lastPrice.length + 1,
        string.indexOf('@', 0) - 2
      );
      let pChange = string.substr(
        lastPrice.length + change.length + 2,
        string.indexOf('@', 0) - 4
      );

      res.json({
        lastPrice: lastPrice,
        change: change,
        name: 'SENSEX',
        pChange: pChange
      });
    });
});

module.exports = router;
