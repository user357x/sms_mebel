"use strict";

const discounts = [
    {
        percent: 5,
        maxCount: 220
    },
    {
        percent: 3,
        maxCount: 990
    },
    {
        percent: 2,
        maxCount: 990
    }
];

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.getDiscount = function getDiscount(check) {

    const index = getRandomInRange(0, discounts.length - 1);

    if(
        check.count_5_percent >= discounts[0].maxCount &&
        check.count_3_percent >= discounts[1].maxCount &&
        check.count_2_percent >= discounts[2].maxCount
    ) return null;

    if(check[`count_${discounts[index].percent}_percent`] < discounts[index].maxCount) {
        return discounts[index].percent
    }
    else {
        return getDiscount(check);
    }

};