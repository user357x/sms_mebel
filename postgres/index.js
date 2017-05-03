'use strict';
 
const options = {
	extend : db => {
		db.sms = require('./sms')(db);
	},
	error : (error, e) => {
		if(e.cn) console.log('Ошибка соединения с базой данных');
	}
};

const db = require('pg-promise')(options);

module.exports = db; 