'use strict';
 
module.exports = db => {
	return {
 		getById : id => db.oneOrNone(
            `select *, 
                CASE WHEN 
                    last_vizit < CURRENT_TIMESTAMP - INTERVAL '24 hours' 
                THEN true ELSE false END as is_later
            from public.user where id = $1`, 
            [+id]
        ),

        insert: (id, history) => db.none(
        	`insert into public.user(id, history, last_vizit) values($1, $2, now())`, 
        	[+id, history]
        ),

        update: (id, history) => db.none(
            `update public.user set history = $2, last_vizit = now() where id = $1`,
            [+id, history]
        )
	};
}