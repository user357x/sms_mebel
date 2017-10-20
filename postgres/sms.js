'use strict';
 
module.exports = db => {
	return {
	    check: () => db.one(
            `select * from public.sms where id = 1`
        ),
        update: (percent) => db.one(
            `update public.sms set 
            count = count + 1, 
            count_${percent}_percent = count_${percent}_percent + 1
            where id = 1 returning count`
        ),

	};
};