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

    const cities = yield db.city.getAll();

    res.render("layout", {
        block : 'form',
        cities : cities
    });

}).catch(next));



app.get('/send', (req, res, next) => db.task(function* (db) {

    if(!req.query.name || !req.query.city_id || !req.query.phone || !req.query.order) {
        res.send(
            `<span style="color: red">Вы заполнили не все поля!</span><br>
            <a href="/">Попробовать ещё раз</a>`
        );
        return;
    }

    const login = req.query.login;

    const password = req.query.password;

    const name = req.query.name;

    const city_id = req.query.city_id;

    const phone = req.query.phone;

    const order = req.query.order;

    /*

    const check = yield db.sms.check();

    let percent;

    if(check.count + 1 === 3000000)
        percent = 50;
    else
        percent = getDiscount(check);

    if(!percent)
        res.redirect('back');*/

    const last = yield db.items.getLast(city_id);

    console.log(last);

    let num;

    if(last) {
        num = ++last.num;
    }
    else {
        num = 1000;
    }

    let percent;

    if(num % 10 === 0) {
        percent = 5;
    }
    else {
        percent = (Math.floor(Math.random() * 2) === 0) ? 2 : 3;
    }

    const result = yield db.items.setItem(name, phone, city_id, order, num, percent);

    //const text = `${result.name}, Поздравляем! Вам присвоен №${result.num}. г. ${result.city}. Ваша доп. скидка ${result.percent}`;
    const text = `${result.name}, Поздравляем! Вам присвоен №${result.num}. г. ${result.city}. Ваша доп. скидка ${result.percent}%`;

    const r = yield smsSender(login, password, phone, text);

    if(r.text !== 'OK') {
        yield db.items.deleteOnId(result.id);
        res.send(
            `<span style="color: red">Не корректный номер телефона!</span><br>
            <a href="/">Попробовать ещё раз</a>`
        );
    }
    else {
        res.send(
            `<span style="color: green">Сообщение успешно отправлено!</span><br>
            <a href="/">Назад</a>`
        );
    }

}).catch(next));



app.get('/messages', (req, res, next) => db.task(function* (db) {

    const items = yield db.items.getAll();

    //console.log(items)

    let city = '';

    const result = {};

    items.forEach(item => {
        item.date = getDate(item.date);

        if(city !== item.city) {

            city = item.city;
            result[city] = [];

            result[city].push(item);

        }
        else {

            result[city].push(item);

        }


    });

    console.log(result);

    res.render("layout", {
        block : 'items',
        result : result
    });

}).catch(next));



app.use(errorHandler);

app.listen(3000, () => console.log('Example app listening on port 3000!'));