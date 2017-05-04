'use strict';
 
module.exports = db => {
	return {
        update: () => db.one(
            `update public.sms set count = count + 1 where id = 1 returning count`
        )
	};
}