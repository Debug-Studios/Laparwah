const router = require('express').Router();
const axios = require('axios');

router.get('/getCurrentWeather', (req, res) => {
  axios
    .get(
      'http://api.wunderground.com/api/0040c7e39bf9e182/hourly/q/IN/Dehradun.json'
    )
    .then(response => {
      res.json(response.data);
    });
});

module.exports = router;
