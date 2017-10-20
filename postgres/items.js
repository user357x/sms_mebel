'use strict';

module.exports = db => {
    return {
        setItem: (name, phone, city_id, order) => db.one(
            `insert into public.items(name, phone, city_id, "order") values($1, $2, $3, $4) 
            returning *, id + 1000 as id, (select name from public.city c where c.id = city_id) as city`,
            [name, phone, city_id, order]
        ),
        getAll: () => db.any(
            `select *, c.name as city, i.name as name, i.id + 1000 as id from public.items i
             inner join public.city c on c.id = i.city_id
             GROUP BY c.id, i.id
             `
        ),
        deleteOnId: (id) => db.none(
            `delete from public.items where id = $1`, [id]
        ),

    };
};