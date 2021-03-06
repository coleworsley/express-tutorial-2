const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false})
const data = require('./public/data')

app.use(express.static(path.join(__dirname, 'public')));

const urlLogger = (request, response, next) => {
  console.log('Request URL:', request.url);
  next();
};

const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString());
  next();
};

app.use(urlLogger, timeLogger);

app.get('/', (request, response) => {
  response.send('hello world');
});

app.get('/json', (request, response) => {
  response.status(200).json({"name": "Cole"});
});

app.get('/sunsets', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'public/sunsets.html'))
})

app.get('/data', (req, res) => {
  res.status(200).json({data: data});
})

app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
});
