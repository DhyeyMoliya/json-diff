# json-obj-diff

A tiny library to find difference between two json objects

## Install

```sh
npm install json-obj-diff
```

## Usage Example

```js
import { jsonObjDiff } from "json-obj-diff";

const obj1 = {
  a: 1,
  b: [1],
  c: {
    d: 1,
    e: "12312",
  },
};
const obj2 = {
  a: 10,
  b: [1, 2, 3],
  c: {
    d: 10,
    e: "1",
  },
};

const diff1 = jsonObjDiff(obj1, obj2);
/* 
diff1 = {
  a: { _o: 1, _n: 10 },
  b: {
    '1': { _o: undefined, _n: 2 },
    '2': { _o: undefined, _n: 3 },
    _arr_len_o: 1,
    _arr_len_n: 3,
    _arr: true
  },
  c: { 
    d: { _o: 1, _n: 10 }, 
    e: { _o: '12312', _n: '1' } 
  }
}
*/
```

## API :

```ts
jsonDiff(
    value1: any,
    value2: any,
    propNames: {
        oldValue: string, // default '_o',
        newValue: string, // default '_n',
        isArr: string, // default '_arr',
        arrLenOld: string, // default '_arr_len_o',
        arrLenNew: string, // default '_arr_len_n',
    }
)
```

## Important Note :

Arrays are converted to Objects with `index` as `key` while checking array difference

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/DhyeyMoliya/json-obj-diff/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is [MIT](https://github.com/DhyeyMoliya/json-obj-diff/blob/master/LICENSE.md) licensed.
