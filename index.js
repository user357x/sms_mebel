"use strict";

const express = require('express');
const app = express();

const config = require(`${__dirname}/./config`);
const errorHandler = require(`${__dirname}/./errorHandler`);
const smsSender = require(`${__dirname}/./smsSender`);
const getDate = require(`${__dirname}/./getDate`);

global.db = require(`${__dirname}/./postgres`)(config.postgres);

app.engine('ejs', require('ejs-locals'));
app.set('views', `${__dirname}/./template`);
app.set('view engine', 'ejs');

app.get('/', (req, res, next) => db.task(function* (db) {

  res.render("layout", {
    block : 'form'
  });

}).catch(error => next(error)));

app.get('/send', (req, res, next) => db.task(function* (db) {

  const login = req.query.login;

  const password = req.query.password;

  const phone = req.query.phone;

  const name = req.query.name;

  const order = req.query.order;

  const city = req.query.city;
  
  const c = yield db.sms.update();

  //console.log(count);

  const text = `${name} поздравляем! Вы ${c.count} покупатель.`;

  const r = yield smsSender(login, password, phone, text);

  

  yield db.order.insert(name, phone, order, c.count, city);

  //res.send('success');

  //res.send(req.get('Referrer') || req.get('Referer'));

  res.redirect('back');

}).catch(error => next(error)));

app.get('/messages', (req, res, next) => db.task(function* (db) {

  const orders = yield db.order.getAll();

  res.render("layout", {
    block : 'list',
    orders : orders.map(order => Object.assign(order, { date : getDate(order.date) }))
  });

}).catch(error => next(error)));


app.use(errorHandler);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});