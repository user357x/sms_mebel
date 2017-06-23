'use strict';
 
module.exports = db => {
	return {
        insert: (name, phone, order, count, discount, city) => db.none(
            `insert into public.orders(name, phone, orders, count, discount, city) 
            values($1, $2, $3, $4, $5, $6)`,
            [name, phone, order, count, discount, city]
        ),
        getAll: () => db.any(
        	`select * from public.orders order by id desc`
        )
	};
};