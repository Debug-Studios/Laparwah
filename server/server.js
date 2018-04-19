const express = require('express');
const app = express();
const path = require('path');

const account = require('./models/account');

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/client/index.html'));
});

app.listen(process.env.PORT || 4000, () => {
  console.log('Listening');
});
