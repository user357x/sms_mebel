'use strict';

const request = require('superagent');

module.exports = (login, password, phone, text) => request.get('https://sms.e-vostok.ru/smsout.php').query({
    login : login,
    password : password,
    service : '24382',
    space_force : '1',
    space : 'mche.ru',
    subno : phone,
    text : text
});

//'https://sms.e-vostok.ru/smsout.php?login=mche&password=2JF87w&service=24382&space_force=1&space=mche.ru&subno=89529226259&text=eee'