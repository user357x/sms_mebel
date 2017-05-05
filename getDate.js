'use strict';

const getZero = (value, inc) => {
    let int;
    inc ? int = value + 1 : int = value;
    let result;
    int < 10 ? result = `0${int}` : result = `${int}`;
    return result;
};

module.exports = string => {
    const date = string !== undefined ? new Date(string) : new Date();
    return `${getZero(date.getDate())}.${getZero(date.getMonth(), true)}.${date.getFullYear()} ${getZero(date.getHours())}:${getZero(date.getMinutes())}:${getZero(date.getSeconds())}`;
};