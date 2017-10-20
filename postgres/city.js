'use strict';

module.exports = db => {
    return {

        getAll: () => db.any(
            `select * from public.city`
        )
    };
};