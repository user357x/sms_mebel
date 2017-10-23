'use strict';

module.exports = db => {
    return {
        setItem: (name, phone, city_id, order) => db.one(
            `insert into public.items(name, phone, city_id, "order") values($1, $2, $3, $4) 
            returning *, id + 1000 as id, (select name from public.city c where c.id = city_id) as city`,
            [name, phone, city_id, order]
        ),
        getAll: () => db.any(
            `select 
                *,
                c.name as city, 
                i.name as name, 
                i.id + 1000 as id, 
                row_number() OVER (PARTITION BY c.id ORDER BY i.date) AS rating_in_section
                from public.items i
                inner join public.city c on c.id = i.city_id`
        ),
        deleteOnId: (id) => db.none(
            `delete from public.items where id = $1`, [id]
        ),

    };
};