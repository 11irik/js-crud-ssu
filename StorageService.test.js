const StorageService = require('./StorageService');
const storage = new StorageService();

class Pair {
    constructor(value1, value2) {
        this.field1 = value1
        this.field2 = value2
    }
}

let key1 = "key1"
let key2 = "key2"
let value0 = "value0"
let value1 = "value1"
let value2 = "value2"

let pair1 = new Pair(key1, value1)
let pair2 = new Pair(key2, value2)

let id0 = storage.add(value0);
let id1 = storage.add(pair1);
let id2 = storage.add(pair2);
let notExistId = 100;
let wrongIdType = "2"

test('get by id', () => {
    let elementById = storage.getById(id0);
    expect(elementById).toBe(value0);
});

test('get pair by id', () => {
    let elementById = storage.getById(id1);
    expect(elementById).toBe(pair1);
});

test('check pairs not equail', () => {
    let elementById = storage.getById(id1);
    expect(elementById).not.toBe(pair2);
});

test('get by wrong id type', () => {
    expect(() => {
        storage.getById(wrongIdType);
    }).toThrow();
});

test('get by non exist id', () => {
    expect(storage.getById(notExistId)).toBeUndefined();
});
