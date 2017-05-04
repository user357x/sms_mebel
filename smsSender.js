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