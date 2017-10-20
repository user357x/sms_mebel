"use strict";

const express = require('express');
const app = express();
const bodyParser = require(`body-parser`);

const config = require(`${__dirname}/./config`);
const errorHandler = require(`${__dirname}/./errorHandler`);
const smsSender = require(`${__dirname}/./lib/smsSender`);
const getDate = require(`${__dirname}/./lib/getDate`);
const getDiscount = require(`${__dirname}/./lib/getDiscount`).getDiscount;

global.db = require(`${__dirname}/./postgres`)(config.postgres);

app.engine('ejs', require('ejs-locals'));
app.set('views', `${__dirname}/./template`);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended : false }));



app.get('/', (req, res, next) => db.task(function* (db) {

    res.render("layout", {
        block : 'form'
    });

}).catch(next));



app.get('/send', (req, res, next) => db.task(function* (db) {

    if(!req.query.name || !req.query.city || !req.query.phone) {
        res.send(400);
        return;
    }

    const login = req.query.login;

    const password = req.query.password;

    const phone = req.query.phone;

    const name = req.query.name;

    const city = req.query.city;

    //const order = req.query.order;

    //const check = yield db.sms.check();

    //let percent;

    /*if(check.count + 1 === 3000000)
        percent = 50;
    else
        percent = getDiscount(check);

    if(!percent)
        res.redirect('back');*/


    let result = yield db.items.setItem(name, phone, city);

    //yield db.order.insert(name, phone, order, result.count, percent, city);

    const text = `${result.name}, Поздравляем! Вам присвоен №${result.id + 1000}. г. ${result.city}.`;

    const r = yield smsSender(login, password, phone, text);

    if(r.text !== 'OK')
        yield db.items.deleteOnId(result.id);

    console.log(r.text);

    res.redirect('back');

}).catch(next));



app.get('/messages', (req, res, next) => db.task(function* (db) {

    const orders = yield db.items.getAll();

    res.render("layout", {
        block : 'items',
        orders : orders.map(order => Object.assign(order, {
            date : getDate(order.date),
            id : order.id + 1000
        }))
    });

}).catch(next));



app.use(errorHandler);

app.listen(3000, () => console.log('Example app listening on port 3000!'));