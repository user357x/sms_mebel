'use strict';

module.exports = db => {
    return {
        setItem: (name, phone, city) => db.one(
            `insert into public.items(name, city, phone) values($1, $2, $3) returning *`,
            [name, phone, city]
        ),
        getAll: () => db.any(
            `select * from public.items order by id desc`
        ),
        deleteOnId: (id) => db.none(
            `delete from public.items where id = $1`, [id]
        ),
    };
};