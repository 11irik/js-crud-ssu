const StorageService = require('./StorageService');
const storage = new StorageService();

class Pair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

let key1 = "key1";
let key2 = "key2";
let value0 = "value0";
let value1 = "value1";
let value2 = "value2";
let value3 = "value3";

let pair1 = new Pair(key1, value1);
let pair2 = new Pair(key2, value2);

let id0 = storage.add(value0);
let id1 = storage.add(pair1);
let id2 = storage.add(pair2);
let id3;
let notExistId = '100';
let wrongIdType = 2;

test('add test', () => {
    id3 = storage.add(value3);
    expect(typeof id3).toBe('string')
    expect(id3).toBe(String(Number(id2) + 1));
});

test('get by id', () => {
    let elementById = storage.getById(id3);
    expect(elementById).toBe(value3);
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

test('delete by id', () => {
    expect(storage.deleteById(id1)).toBeTruthy();
    expect(storage.getById(id1)).toBeUndefined();
});

test('delete by wrong id', () => {
    expect(storage.deleteById(notExistId)).toBeFalsy();
});

test('delete by wrong id', () => {
    expect(storage.deleteById(wrongIdType)).toBeFalsy();
});

test('log get all', () => {
    console.log(storage.getAll())
})