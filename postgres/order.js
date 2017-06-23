'use strict';
 
module.exports = db => {
	return {
        insert: (name, phone, order, count, city) => db.none(
            `insert into public.orders(name, phone, orders, count, city) values($1, $2, $3, $4, $5)`, 
            [name, phone, order, count, city]
        ),
        getAll: () => db.any(
        	`select * from public.orders order by id desc`
        )
	};
};