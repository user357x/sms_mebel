'use strict';
 
module.exports = db => {
	return {
        insert: (name, phone, order, count) => db.none(
            `insert into public.orders(name, phone, orders, count) values($1, $2, $3, $4)`, 
            [name, phone, order, count]
        ),
        getAll: () => db.any(
        	`select * from public.orders order by id desc`
        )
	};
}