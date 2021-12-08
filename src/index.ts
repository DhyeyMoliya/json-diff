const nonExistent = [null, undefined];
type DiffPropNames = Partial<{
    oldValue: string,
    newValue: string,
    isArr: string
    arrLenOld: string,
    arrLenNew: string,
}>;

const defaultPropNames: DiffPropNames = {
    oldValue: '_o',
    newValue: '_n',
    isArr: '_arr',
    arrLenOld: '_arr_len_o',
    arrLenNew: '_arr_len_n',
};

export function jsonObjDiff(value1: any, value2: any, propNames: DiffPropNames = {}) {
    const opts: DiffPropNames = { ...defaultPropNames, ...propNames };
    const prepareDiff = (val1, val2) => {
        let difference: any = {};
        if (nonExistent.includes(val1) || nonExistent.includes(val2)) {
            difference[opts.oldValue] = val1;
            difference[opts.newValue] = val2;
        } else if ((Array.isArray(val1) && !Array.isArray(val2)) || (!Array.isArray(val1) && Array.isArray(val2))) {
            difference[opts.oldValue] = val1;
            difference[opts.newValue] = val2;
        } else if ((typeof val1 === 'object' && typeof val2 !== 'object') || (typeof val1 !== 'object' && typeof val2 === 'object')) {
            difference[opts.oldValue] = val1;
            difference[opts.newValue] = val2;
        } else {
            if (Array.isArray(val1)) {
                // If array
                const arrayDiff: any = {};
                const obj1Len = val1?.length || 0;
                const obj2Len = val2?.length || 0;
                const maxLength = obj1Len >= obj2Len ? obj1Len : obj2Len;
                if (obj1Len !== obj2Len) {
                    arrayDiff[opts.arrLenOld] = obj1Len;
                    arrayDiff[opts.arrLenNew] = obj2Len;
                }
                for (let index = 0; index < maxLength; index++) {
                    const itemDiff = prepareDiff(val1[index], val2[index]);
                    if (Object.values(itemDiff).length) {
                        arrayDiff[index] = itemDiff;
                    }
                }
                if (Object.values(arrayDiff).length) {
                    arrayDiff[opts.isArr] = true;
                }
                return arrayDiff;
            } else if (typeof val1 === 'object') {
                const props = Object.getOwnPropertyNames({ ...val1, ...val2 });
                for (let prop of props) {
                    if (Array.isArray(val1[prop])) {
                        // If prop value is Array
                        const arrayDiff = prepareDiff(val1[prop], val2[prop]);
                        if (Object.keys(arrayDiff).length) {
                            difference[prop] = arrayDiff;
                        }
                    } else if (typeof val1[prop] === 'object') {
                        // If prop value is Object
                        const objDiff = prepareDiff(val1[prop], val2[prop]);
                        if (Object.keys(objDiff).length) {
                            difference[prop] = objDiff;
                        }
                    } else {
                        // If prop value is Single Value
                        const valueDiff = prepareDiff(val1[prop], val2[prop]);
                        if (Object.keys(valueDiff).length) {
                            difference[prop] = valueDiff;
                        }
                    }
                }
            } else {
                // Single Values
                if (val1 !== val2) {
                    difference = {
                        [opts.oldValue]: val1,
                        [opts.newValue]: val2,
                    };
                }
            }
        }
        return difference;
    }
    return prepareDiff(value1, value2);
};
