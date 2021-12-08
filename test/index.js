import { jsonObjDiff } from 'json-obj-diff';

const obj1 = {
    a: 1,
    b: [1],
    c: {
        d: 1,
        e: "12312"
    }
};
const obj2 = {
    a: 10,
    b: [1, 2, 3],
    c: {
        d: 10,
        e: "1"
    }
};
const diff1 = jsonObjDiff(obj1, obj2);
console.log('Difference: ', diff1);
