"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkQuery = void 0;
const exampleKnifeQuery = [['number', 'number'], ['width', 'number'], ['height', 'number']];
const checkQuery = (query) => {
    const likeArray = Object.entries(query);
    const matchProp = [];
    return likeArray.every(prop => {
        console.log(prop, typeof Number(prop[1]));
        //check on repeat
        if (matchProp.includes(prop[0])) {
            return false;
        }
        let isMatch = false;
        exampleKnifeQuery.forEach(item => {
            if (item[0] === prop[0] && item[1] === typeof Number(prop[1])) {
                isMatch = true;
                matchProp.push(item[0]);
            }
        });
        return isMatch;
    });
};
exports.checkQuery = checkQuery;
