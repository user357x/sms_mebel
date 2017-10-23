'use strict';

module.exports = db => {
    return {
        setItem: (name, phone, city_id, order, num, percent) => db.one(
            `insert into public.items(name, phone, city_id, "order", num, percent) values($1, $2, $3, $4, $5, $6) 
            returning *, (select name from public.city c where c.id = city_id) as city`,
            [name, phone, city_id, order, num, percent]
        ),
        getLast: (city_id) => db.oneOrNone(
            `select num, percent from public.items where city_id = $1 ORDER BY num DESC limit 1`,
            [city_id]
        ),
        getAll: () => db.any(
            `select 
                *,
                c.name as city, 
                i.name as name, 
                row_number() OVER (PARTITION BY c.id ORDER BY i.num) AS rating_in_section
                from public.items i
                inner join public.city c on c.id = i.city_id`
        ),
        deleteOnId: (id) => db.none(
            `delete from public.items where id = $1`, [id]
        ),

    };
};