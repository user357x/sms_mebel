'use strict';

module.exports = {
	token : 'a7acb2c3d44ad4102eeb7800f01212d2363b52f96c7f8c37c798205f1d43dcac1e9d446a6a5d59358a032', // токен сообщества
	group_id : 143960347, // id сообщества
	postgres : {
	    host : "localhost", // ip postgres
	    port : 5432, // port postgres
	    database : "sms_mebel", // db name postgres
	    user : "postgres", // db user postgres
	    password : "123qwe" // db password
	},
	salt : 'salt', // соль для пароля от админки, любое слово
	port : 3000, // порт, на котором работает админка
	session : {
	    key : 'connect.sid',
	    secret : 'secret', // любое слово
	   	cookie : {
			path : "/",
			httpOnly : true,
			maxAge : null
	    }
	},
	rememberInterval : 30
};