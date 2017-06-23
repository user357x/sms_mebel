"use strict";

const express = require('express');
const app = express();

const config = require(`${__dirname}/./config`);
const errorHandler = require(`${__dirname}/./errorHandler`);
const smsSender = require(`${__dirname}/./lib/smsSender`);
const getDate = require(`${__dirname}/./lib/getDate`);
const getDiscount = require(`${__dirname}/./lib/getDiscount`).getDiscount;

global.db = require(`${__dirname}/./postgres`)(config.postgres);

app.engine('ejs', require('ejs-locals'));
app.set('views', `${__dirname}/./template`);
app.set('view engine', 'ejs');



app.get('/', (req, res, next) => db.task(function* (db) {

    res.render("layout", {
        block : 'form'
    });

}).catch(next));



app.get('/send', (req, res, next) => db.task(function* (db) {

    const login = req.query.login;

    const password = req.query.password;

    const phone = req.query.phone;

    const name = req.query.name;

    const order = req.query.order;

    const city = req.query.city;

    const check = yield db.sms.check();

    let percent = getDiscount(check);

    if(!percent)
        res.redirect('back');

    const result = yield db.sms.update(percent);

    if(result.count === 3000000)
        percent = 50;

    yield db.order.insert(name, phone, order, result.count, percent, city);

    const text = `${name} поздравляем! Вы ${result.count} покупатель. Доп. скидка ${percent} %`;

    const r = yield smsSender(login, password, phone, text);

    console.log(r.text);

    res.redirect('back');

}).catch(next));



app.get('/messages', (req, res, next) => db.task(function* (db) {

    const orders = yield db.order.getAll();

    res.render("layout", {
        block : 'list',
        orders : orders.map(order => Object.assign(order, { date : getDate(order.date) }))
    });

}).catch(next));



app.use(errorHandler);

app.listen(3000, () => console.log('Example app listening on port 3000!'));