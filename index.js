"use strict";

const express = require('express');
const app = express();

const config = require(`${__dirname}/./config`);
const errorHandler = require(`${__dirname}/./errorHandler`);

global.db = require(`${__dirname}/./postgres`)(config.postgres);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(errorHandler);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});