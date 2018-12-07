const express = require('express'),
  bodyParser = require('body-parser'),
  rp = require('request-promise')
req = require('request');

const port = process.env.PORT || 3000;
const app = express();
const bookrouter = express.Router();
const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    start: 1,
    limit: 5000,
    convert: 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': 'bc21eb8d-0707-4fd7-8e1f-67cd6839b71f'
  },
  json: true,
  gzip: true
};

bookrouter.route('/infolite')
  .get(function (req, res) {
    rp(requestOptions, function (err, response, body) {
      if (err) {
        console.error(err);
      }
      else {
        console.log(body)
        res.json(body)
      }
    })
  })

app.use('/api', bookrouter);
app.get('/', function (req, res) {
  res.send("welcome everyone")
})

app.listen(port, function () {
  console.log('Gulp  is running on the ' + port);
})    