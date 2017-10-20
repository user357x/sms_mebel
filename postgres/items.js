'use strict';

module.exports = db => {
    return {
        setItem: (name, city) => db.one(
            `insert into public.items(name, city) values($1, $2) returning *`,
            [name, city]
        ),
        getAll: () => db.any(
            `select * from public.items order by id desc`
        ),
        deleteOnId: (id) => db.none(
            `delete from public.items where id = $1`, [id]
        ),
    };
};