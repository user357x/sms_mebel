'use strict';
 
const options = {
	extend : db => {
		db.sms = require('./sms')(db);
		db.order = require('./order')(db);
		db.items = require('./items')(db);
	},
	error : (error, e) => {
		if(e.cn) console.log('Ошибка соединения с базой данных');
	}
};

const db = require('pg-promise')(options);

module.exports = db; 